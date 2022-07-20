// backend/routes/api/bookings.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Spot, Booking} = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

/**********************Get all of the Current User's Bookings**********************/

router.get('/currentUserBookings',[restoreUser,requireAuth],
async (req, res) => {

    const {user} = req;
    let bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: Spot
    });
    
    res.json(
        {
           Bookings : bookings
        }
    );
})

/**********************Edit a Booking**********************/

router.post('/:id',[restoreUser,requireAuth],
async (req, res, next) => {
    const {user} = req;
    const {startDate,endDate} = req.body;
    const {id} = req.params;

    const booking = await Booking.findOne({
        where: {
            id: id
        }
    });

    const otherBookings = await Booking.findOne({
        where:{
            [Op.and]: [
            {id:{[Op.ne]: id}},
            {startDate: {[Op.lte]: endDate}},
            {endDate: {[Op.gte]: startDate}}
            ]
        }
    });
 
    let today;
    let bookingDate;
    if(booking) {
        today = new Date();
        bookingDate = new Date(booking.endDate);
    }

    // console.log('booking Date', booking.endDate)
    // console.log('bookingDate')
    // console.log(bookingDate.valueOf())
    // console.log('today')
    // console.log( today.valueOf())
    // console.log('bookingdate - today')
    // console.log(bookingDate.valueOf() - today.valueOf());

    if(!booking){

        const err = new Error(`Booking couldn't be found`);
        err.status = 404;
        err.message = `Booking couldn't be found`;
        err.statusCode = 404;
        return next(err);

    } else if(user.id !== booking.userId){

        const err = new Error(`Booking must belong to the current user`);
        err.status = 403;
        err.message = `Forbidden`;
        err.statusCode = 403;
        return next(err);

    } else if(bookingDate.valueOf() - today.valueOf() < 0){

        const err = new Error(`Past bookings can't be modified`);
        err.status = 400;
        err.message = `Past bookings can't be modified`;
        err.statusCode = 400;
        return next(err);

    } else if(otherBookings){

        const err = new Error(`Sorry, this spot is already booked for the specified dates`);
        err.status = 403;
        err.message = `Sorry, this spot is already booked for the specified dates`;
        err.statusCode = 403;
        return next(err);

    } else {
        
        await Booking.update({ 
            startDate: startDate,
            endDate: endDate
        },{where : {id: id}});

        const updatedBooking = await Booking.findOne({where: {id: id}})

        res.statusCode = 200;
        res.json(updatedBooking);

    }

});

/**********************Delete a Booking**********************/
router.delete('/:id',[restoreUser,requireAuth],
async (req, res, next) => {
    const {user} = req;
    const {id} = req.params;
    const booking = await Booking.findByPk(id);
    let today;
    let bookingDate;
    let spot;
    if(booking){
        today = new Date();
        bookingDate = new Date(booking.startDate);
        spot = await Spot.findByPk(booking.spotId);
    }
    if(!booking){

        const err = new Error(`Booking couldn't be found`);
        err.status = 404;
        err.message = `Booking couldn't be found`;
        err.statusCode = 404;
        return next(err);

     } else if(user.id !== booking.userId && user.id !== spot.ownerId){

        const err = new Error(`Booking must belong to the current user or the Spot must belong to the current user`);
        err.status = 403;
        err.message = `Forbidden`;
        err.statusCode = 403;
        return next(err);

    } else if(bookingDate.valueOf() - today.valueOf() < 0){

        const err = new Error(`Bookings that have been started can't be deleted`);
        err.status = 400;
        err.message = `Bookings that have been started can't be deleted`;
        err.statusCode = 400;
        return next(err);
    } else {

        await booking.destroy();

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });

    }
});


module.exports = router;
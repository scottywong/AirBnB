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


    console.log('id: ', id );

    const booking = await Booking.findOne({
        where: {
            id: id
        }
    });
    console.log('thebooking:', booking);

    const otherBookings = await Booking.findOne({
        where:{
            [Op.and]: [
                {id:{[Op.ne]:id}},
                {spotId: booking.spotId},
                {[Op.or]: [
                    { startDate: { [Op.between]: [req.body.startDate, req.body.endDate] } },
                    { endDate: { [Op.between]: [req.body.startDate, req.body.endDate] } }
                ]}]
        }
    });
 
    let today;
    let bookingDate;

    if(!booking){

        const err = new Error(`Booking couldn't be found`);
        err.errors = [];
        err.errors.push("Booking couldn't be found");
        err.status = 404;
        err.message = `Booking couldn't be found`;
        err.statusCode = 404;
        return next(err);

    }

    if(booking) {
        today = new Date();
        bookingDate = new Date(endDate);
        // console.log('bookingDate: ',bookingDate);
        // console.log('bookingDate.valueof ,', bookingDate.valueOf());
        // console.log('today.valueOf()',today.valueOf());
        
        if(user.id !== booking.userId){

            const err = new Error(`Booking must belong to the current user`);
            err.errors = [];
            err.errors.push("Booking must belong to the current user");
            err.status = 403;
            err.message = `Forbidden`;
            err.statusCode = 403;
            return next(err);

        } 
        
        if( bookingDate.valueOf() - today.valueOf() < 0 ){

            const err = new Error(`Past bookings can't be modified`);
            err.errors = [];
            err.errors.push("Past bookings can't be modified");
            err.status = 400;
            err.message = `Past bookings can't be modified`;
            err.statusCode = 400;
            return next(err);

        } 
        
        if(otherBookings){

            console.log('the other Bookings: ', otherBookings);
            const err = new Error(`Sorry, this spot is already booked for the specified dates`);
            err.errors = [];
            err.errors.push("Sorry, this spot is already booked for the specified dates");
            err.status = 403;
            err.message = `Sorry, this spot is already booked for the specified dates`;
            err.statusCode = 403;
            return next(err);

        } 
            
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
        err.errors = [];
        err.status = 404;
        err.message = `Booking couldn't be found`;
        err.errors.push("Booking couldn't be found");
        err.statusCode = 404;
        return next(err);

     } else if(user.id !== booking.userId && user.id !== spot.ownerId){

        const err = new Error(`Booking must belong to the current user or the Spot must belong to the current user`);
        err.errors = [];
        err.errors.push("Booking must belong to the current user or the Spot must belong to the current user");
        err.status = 403;
        err.message = `Forbidden`;
        err.statusCode = 403;
        return next(err);

    } else if(bookingDate.valueOf() - today.valueOf() < 0){

        const err = new Error(`Bookings that have been started can't be deleted`);
        err.errors = [];
        err.errors.push(`Bookings that have been started can't be deleted`);
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
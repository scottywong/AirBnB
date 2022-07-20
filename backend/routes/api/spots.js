// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth , restoreUser} = require('../../utils/auth');
const { User, Spot, Review, Image, Booking} = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

/**********************Get All Spots **********************/
router.get('/', async(req,res,next ) => {
    
    if(Object.keys(req.query).length > 0){

        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.statusCode = 400,
        err.errors = [];

        if(req.query.page < 0) err.errors.push('Page must be greater or equal to 0');
        if(req.query.size < 0) err.errors.push('Size must be greater or equal to 0');
        if(req.query.maxLat && req.query.maxLat.indexOf(".") == -1) err.errors.push('Maximum Latitude is invalid. Must be decimal');
        if(req.query.minLat && req.query.minLat.indexOf(".") == -1) err.errors.push('Minimum Longiutude is invalid. Must be decimal');
        if(req.query.minPrice  < 0) err.errors.push('Minimum Price must be greater or equal to 0');
        if(req.query.maxPrice  < 0) err.errors.push('Maximum Price must be greater or equal to 0');
        if(err.errors.length > 0) return next(err);

    }

    let query = {
        where: {},
        include: []
    };

   
    const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    if(req.query.minLat) query.where.lat =  {[Op.gte] :parseInt(req.query.minLat)};
    if(req.query.maxLat) query.where.lat =  {[Op.lte] :parseInt(req.query.maxLat)};
    if(req.query.minLng) query.where.lng =  {[Op.gte] :parseInt(req.query.minLng)};
    if(req.query.maxLng) query.where.lng = {[Op.lte] :parseInt(req.query.maxLng)};
    if(req.query.minPrice) query.where.price = {[Op.gte] : parseInt(req.query.minPrice )};
    if(req.query.maxPrice) query.where.price = {[Op.lte] : parseInt(req.query.maxPrice)};

    const spots = await Spot.findAll(query);

    return res.json({
        spots,
        page: page,
        size: size
    });
    

});

/**********************Get all Spots owned by the Current User**********************/
router.get('/currentUserSpots',[requireAuth,restoreUser], 

    async(req,res) => {

    const { user } = req;
    const Spots = await Spot.findAll({
        where: {
        ownerId: user.id
        }
    });

    res.json({Spots});
  });

/********************** Get details of a Spot from an id **********************/
router.get('/:id', 
    async (req,res,next) => {

    const spot = await Spot.findOne({
        where: {
            id: req.params.id,
            
        },
        include: Image
        });

    if(!spot){
        res.status = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }else{
        res.json(spot);
    }
});

/**********************Create a Spot**********************/
router.post('/',[requireAuth,restoreUser],
async (req,res,next) => {

    const {address,city,state,country,lat,lng,name,description,price} = req.body;

    if(!address || !city|| !state || !country || !lat || !lng || !name || !description || !price){
        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.statusCode = 400,
        err.errors = [];
  
        if(!address) err.errors.push("Street address is required");
        if(!city) err.errors.push("City is required");
        if(!state) err.errors.push("State is required");
        if(!country) err.errors.push("Country is required");
        if(!lat) err.errors.push("Latitude is required");
        if(!lng) err.errors.push("Longitude is required");
        if(!name) err.errors.push("Name is required");
        if(!description) err.errors.push("Description is required");
        if(!price) err.errors.push("Price is required");

        return next(err);
      
    } else {

        const {user} = req;
        const spot = await Spot.create({
            
            ownerId: user.id,
            address: "123 Disney Lane",
            city: "San Francisco",
            state: "California",
            country: "United States of America",
            lat: 37.7645358,
            lng: -122.4730327,
            name: "App Academy",
            description: "Place where web developers are created",
            price: 123
        });

        res.statusCode = 201;
        res.json(spot);
    }
})


/**********************Edit a Spot**********************/
router.post('/:id',[requireAuth,restoreUser],
async (req,res,next) => {

    const {address,city,state,country,lat,lng,name,description,price} = req.body;

    if(!address || !city|| !state || !country || !lat || !lng || !name || !description || !price){
        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.statusCode = 400,
        err.errors = [];
  
        if(!address) err.errors.push("Street address is required");
        if(!city) err.errors.push("City is required");
        if(!state) err.errors.push("State is required");
        if(!country) err.errors.push("Country is required");
        if(!lat) err.errors.push("Latitude is required");
        if(!lng) err.errors.push("Longitude is required");
        if(!name) err.errors.push("Name is required");
        if(!description) err.errors.push("Description is required");
        if(!price) err.errors.push("Price is required");

        return next(err);
      
    } else {

        const {user} = req;
        const spotId = parseInt(req.params.id);
        const spot = await Spot.findOne({where:{id: spotId}});
        if(!spot){
            const err = new Error(`Spot couldn't be found`);
            err.message = `Spot couldn't be found`;
            err.status = 404;
            err.statusCode = 404;
            return next(err);
        }
        if(user.id != spot.ownerId){
        const err = new Error('Authorization Error');
        err.status = 403;
        err.statusCode = 403; 
        err.message = "Forbidden";
        return next(err);

        }

        await Spot.update({          
            ownerId: user.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        },{where : {id: spot.id}});

        res.statusCode = 201;
        res.json(spot);
    }
});

/**********************Delete a Spot**********************/
router.delete('/:id', [requireAuth,restoreUser],
async (req,res,next)=> {
    const spot = await Spot.findOne({where: {id:req.params.id}});
    if(!spot){
        const err = new Error(`Couldn't find a Spot with the specified id`);
        err.message = `Spot couldn't be found`,
        err.status = 404,
        err.statusCode = 404
        return next(err);
    } else {

        console.log(req)
        const {user} = req;
        if(user.id != spot.ownerId){
            const err = new Error('Authorization Error');
            err.status = 403;
            err.statusCode = 403; 
            err.message = "Forbidden";
            return next(err);
    
        }

        await Spot.destroy({where : {id: spot.id}});
        res.json({
            message: "Successfully deleted",
            statusCode : 200
        });

    }
        
});

/**********************Get all Reviews by a Spot's id (SPOT?)**********************/

// const images = await Image.getReviewImages();

//     //Loop through each review to attach existing image
//     reviews.forEach(review => {

//         let reviewImages = images.filter(el => el.imageableId === review.spotId);
//         // console.log('reviewImages: ', reviewImages);
//         review.dataValues['Images'] = reviewImages;

router.get('/:id/reviews', 
async (req, res, next) => {

    const foundSpot = await Spot.findOne({where: {id: req.params.id}});
    if(!foundSpot){

        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);

    } else {
        const images = await Image.getReviewImages();

        let reviews = await Review.findAll({
            where: {spotId: req.params.id}
        });

        reviews.forEach(review => {

                    let reviewImages = images.filter(el => el.imageableId === review.spotId);
                    review.dataValues['Images'] = reviewImages;
        });

        res.json(reviews);
    }
});

/**********************Create a Review for a Spot based on the Spot's id**********************/
router.post('/:id/reviews', [requireAuth, restoreUser],

async (req,res,next) => {

    const { user } = req;
    const {review, stars} = req.body;
    const {id} = req.params;

    if(!review || !stars || (stars < 1 || stars > 5)){
       

        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.statusCode = 400,
        err.errors = [];

        if(!review) err.errors.push(`Review text is required`);
        if(!stars || (stars < 1 || stars > 5)) err.errors.push(`Stars must be an integer from 1 to 5`);
        return next(err);
    } 

    const spot = Spot.findOne({where: {id: id}});
    const existingReview = await Review.findOne({where: {
        [Op.and]: [
        {spotId: id},
        {userId: user.id}
         ]
        }
    });

    if(!spot){
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        err.message = `Spot couldn't be found`;
        err.statusCode = 404;
        return next(err);
    } else if(existingReview) {
        const err = new Error(`User already has a review for this spot`);
        err.status = 404;
        err.message = `User already has a review for this spot`;
        err.statusCode = 404;
        return next(err);
    } else {

        const createReview = await Review.create({

            userId: user.id,
            spotId: id,
            review: review,
            stars: stars

    });

    res.statusCode = 201;
    res.json(createReview);

    }
});

/**********************Get all Bookings for a Spot based on the Spot's id**********************/

router.get('/:id/bookings', [requireAuth,restoreUser],
async (req, res, next) => {

    const {user} = req;
    const foundSpot = await Spot.findOne({where: {id: req.params.id}});
    const foundBooking = await Booking.findAll({where:{spotId: req.params.id}});

    console.log(foundSpot);

    if(!foundSpot){

        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);

    } else if(user.id !== foundSpot.ownerId){

        const bookings = await Booking.scope('publicBookings').findAll({where:{spotId: req.params.id}});

        res.json(bookings);

    } else {

        const bookings = await Booking.findAll({
            where:{spotId: req.params.id},
            include: User
        });

        res.json({
            Bookings: bookings
        });
    }
});

/**********************Create a Booking from a Spot based on the Spot's id**********************/

router.post('/:id/bookings', [requireAuth, restoreUser],

async (req,res,next) => {

    const { user } = req;
    let { startDate, endDate } = req.body;
    const {id} = req.params;
    const foundSpot = Spot.findOne({where: {id: id}});

    if(!foundSpot){

        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);

    } else if(user.id === foundSpot.ownerId){

        const err = new Error(`Spot must NOT belong to the current user`);
        err.message = 'Forbidden';
        err.status = 403;
        return next(err);

    } else {

        const bookings = await Booking.findOne({
            where:{
                [Op.and]: [
                {spotId: id},
                {[Op.or]: [
                    { startDate: { [Op.between]: [req.body.startDate, req.body.endDate] } },
                    { endDate: { [Op.between]: [req.body.startDate, req.body.endDate] } }
                ]}]
            }
        });

        if(bookings){

            const err = new Error(`Sorry, this spot is already booked for the specified dates`);
            err.message = 'Sorry, this spot is already booked for the specified dates';
            err.status = 403;
            return next(err);

        } else {
          
            const createBooking = await Booking.create({
                userId: user.id,
                spotId: id,
                startDate: startDate,
                endDate: endDate
            });

            res.json(createBooking);

        }

    }

});

/**********************Add an Image to a Spot based on the Spot's id**********************/
router.post('/:id/images', [requireAuth, restoreUser],
async (req,res,next) => {

    const { user } = req;
    const {id} = req.params;
    const {url} = req.body;
    const foundSpot = await Spot.findOne({where: {id: id}});

    if(!foundSpot){

        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);

    } else if(user.id !== foundSpot.ownerId){

        const err = new Error(`Spot must belong to the current user`);
        err.message = 'Forbidden';
        err.status = 403;
        return next(err);

    } else {
        const createImage = await Image.create({
            imageableId: foundSpot.id,
            imageableType: 'Spot',
            url: url
        });

        res.json(createImage);

    }

});

module.exports = router;
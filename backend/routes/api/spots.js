// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth , restoreUser} = require('../../utils/auth');
const { User, Spot, Review, Image} = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/**********************Get All Spots**********************/
router.get('/', requireAuth, async(req,res) => {

    const spots = await Spot.findAll()
    return res.json(spots);

});

//Get all Spots owned by the Current User
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
            id: req.params.id
        }
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

        const err = new Error(`Spot coudn't be found`);
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

module.exports = router;
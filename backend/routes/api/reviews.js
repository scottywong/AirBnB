// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Image,Spot} = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

/**********************Get all Reviews of the Current User**********************/

router.get('/currentUserReviews',[requireAuth,restoreUser],
async (req, res) => {

    const {user} = req;
    let reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [User,Spot]
    });

    const images = await Image.getReviewImages();

    //Loop through each review to attach existing image
    reviews.forEach(review => {

        let reviewImages = images.filter(el => el.imageableId === review.spotId);
        // console.log('reviewImages: ', reviewImages);
        review.dataValues['Images'] = reviewImages;
    });

    res.json(
        {
           Reviews : reviews
        }
    );
})

/**********************Create a Review for a Spot based on the Spot's id**********************/
router.post('/', [requireAuth, restoreUser],

async (req,res,next) => {

    const { user } = req;
    const {spotId, review, stars} = req.params;
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

    const spot = Spot.findOne({where: {id: spotId}});
    const existingReview = Review.findOne({where: {
        [Op.and]: [
        {spotId: spotId},
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
    } else if(!existingReview) {
        const err = new Error(`User already has a review for this spot`);
        err.status = 404;
        err.message = `User already has a review for this spot`;
        err.statusCode = 404;
        return next(err);
    } else {

        const createReview = await Review.create({

            userId: user.id,
            spotId: spotId,
            review: review,
            stars: stars

    });

    res.statusCode = 201;
    res.json(createReview);
    
    }
});

/**********************Edit a Review**********************/

/**********************Delete a Review**********************/

module.exports = router;
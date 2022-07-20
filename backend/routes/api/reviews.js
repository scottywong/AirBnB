// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Image,Spot} = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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
        review.dataValues['Images'] = reviewImages;
    });

    res.json(
        {
           Reviews : reviews
        }
    );
})

/**********************Edit a Review**********************/

router.post('/:id',[requireAuth,restoreUser],
async (req,res,next) => {

    const {user} = req;
    const {review, stars} = req.body;
    const foundReview = await Review.findOne({where: {id: req.params.id}});

    if(!review || !stars || (stars < 1 || stars > 5)){

        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.statusCode = 400,
        err.errors = [];

        if(!review) err.errors.push(`Review text is required`);
        if(!stars || (stars < 1 || stars > 5)) err.errors.push(`Stars must be an integer from 1 to 5`);
        return next(err);

    } else if(!foundReview){

        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        err.message = `Review couldn't be found`;
        err.statusCode = 404;
        return next(err);

    } else if(user.id !== foundReview.userId){

        const err = new Error(`Review must belong to the current user`);
        err.status = 403;
        err.message = `Forbidden`;
        err.statusCode = 403;
        return next(err);


    } else {
        
        await Review.update({ 
            "review": review,
            "stars": stars
        },{where : {id: foundReview.id}});

        const updatedReview = await Review.findOne({where: {id: foundReview.id}})

        res.statusCode = 201;
        res.json(updatedReview);

    }

});

/**********************Delete a Review**********************/
router.delete('/:id',[requireAuth,restoreUser],
async (req,res,next) => {

    const review = await Review.findOne({where: {id:req.params.id}});
    if(!review){
        const err = new Error(`Couldn't find a Review with the specified id`);
        err.message = `Review couldn't be found`,
        err.status = 404,
        err.statusCode = 404
        return next(err);
    } else {

        const {user} = req;
        if(user.id !== review.userId){
            const err = new Error('Authorization Error');
            err.status = 403;
            err.statusCode = 403; 
            err.message = "Forbidden";
            return next(err);
    
        }

        await Review.destroy({where : {id: review.id}});
        res.json({
            message: "Successfully deleted",
            statusCode : 200
        });

    }

});

/**********************Add an Image to a Review based on the Review's id**********************/

router.post('/:id/images', [requireAuth, restoreUser],
async (req,res,next) => {

    const { user } = req;
    const {id} = req.params;
    const {url} = req.body;
    const foundReview = await Review.findOne({where: {id: id},include: Image});

    if(!foundReview){

        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);

    } else if(user.id !== foundReview.userId){

        const err = new Error(`Review must belong to the current user`);
        err.message = 'Forbidden';
        err.status = 403;
        return next(err);

    } else if(foundReview.Images.length > 10){

        const err = new Error(`Maximum number of images for this resource was reached`);
        err.message = 'Maximum number of images for this resource was reached';
        err.status = 400;
        return next(err);

    } else {
        
        const createImage = await Image.create({
            imageableId: foundReview.id,
            imageableType: 'Review',
            url: url
        });

        res.json(createImage);

    }

});
module.exports = router;
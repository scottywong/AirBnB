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
        console.log('reviewImages: ', reviewImages);
        review.dataValues['Images'] = reviewImages;
    });

    res.json(
        {
           Reviews : reviews
        }
    );
})


/**********************Get all Reviews by a Spot's id (SPOT?)**********************/


/**********************Create a Review for a Spot based on the Spot's id**********************/


/**********************Edit a Review**********************/

/**********************Delete a Review**********************/

module.exports = router;
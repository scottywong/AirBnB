// backend/routes/api/images.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Image , Spot, Review} = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/**********************Delete an Image**********************/
router.delete('/:id', [requireAuth,restoreUser],
async (req, res, next) =>{

    const {user} = req;
    const foundImage = await Image.findOne({where: {id: req.params.id},include: [Spot,Review]});

    if(!foundImage){

        const err = new Error(`Image couldn't be found`);
        err.status = 404;
        err.message = `Image couldn't be found`;
        err.statusCode = 404;
        return next(err);

    } else if(foundImage.imageableType === 'Spot'){
        
        if(user.id !== foundImage.Spot.ownerId){
            const err = new Error(`Image must belong to the current user`);
            err.status = 404;
            return next(err);

        } else {

            await foundImage.destroy();
            res.json({
                "message": "Successfully deleted",
            "statusCode": 200
            });

        }

    } else if(foundImage.imageableType === 'Review'){
       
        if(user.id !== foundImage.Review.userId){
            const err = new Error(`Image must belong to the current user`);
            err.status = 404;
            return next(err);

        } else {

            await foundImage.destroy();
            res.json({
                "message": "Successfully deleted",
            "statusCode": 200
            });

        }

    } 

});

module.exports = router;
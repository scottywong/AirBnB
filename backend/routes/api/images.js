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
    const foundIamge = await Image.findOne({where: {id: req.params.id},include: [Spot,Review]});
    
    console.log(foundIamge);

    if(!foundIamge){

        const err = new Error(`Image couldn't be found`);
        err.status = 404;
        err.message = `Image couldn't be found`;
        err.statusCode = 404;
        return next(err);

    } else if(true){
        
        // if(user.id !== foundImage.userId){

        // const err = new Error(`Review must belong to the current user`);
        // err.status = 403;
        // err.message = `Forbidden`;
        // err.statusCode = 403;
        // return next(err);
        // }



    }
});



module.exports = router;
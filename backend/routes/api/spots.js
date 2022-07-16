// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth , restoreUser} = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Get All Spots
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

//   Get details of a Spot from an id
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

module.exports = router;
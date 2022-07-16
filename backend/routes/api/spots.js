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
    console.log(user);
    
    const Spots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });
    
    res.json({Spots});
  });

module.exports = router;
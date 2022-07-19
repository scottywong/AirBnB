// backend/routes/api/bookings.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Spot, Booking} = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


/**********************Get all of the Current User's Bookings**********************/

router.get('/currentUserBookings',[requireAuth,restoreUser],
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
/**********************Get all Bookings for a Spot based on the Spot's id**********************/



module.exports = router;
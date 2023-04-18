//backend/routes/api/tags.js
const express = require('express');
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const router = express.Router();

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId:accessKeyId,
  secretAccessKey:secretAccessKey
});

const s3 = new AWS.S3();

router.get('/test', async (req, res, next) =>{

    console.log('hey it /test worked')
});

router.get('/getAll', async (req, res, next) =>{

    s3.listObjects({Bucket: 'spotbnb-images'}, (err, data) => {
        
        if (err) {
            console.log(err);
            
        } else {
            console.log(data);
            res.json(data);
        }

         //The object data is in the "Contents" property of the data object
        const objects = data.Contents;
        
        // Iterate over the objects and log their keys
        objects.forEach(function(object) {
        console.log(object.Key);
        });
    });
    
    

});



module.exports = router;







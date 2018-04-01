'use strict';

const express= require('express');
const router = express.Router();

let Location = require('../models/location');

router.post('/create',(req,res,next)=>{


	req.check('locationName', 'Event name is required/cannot be undefined').notEmpty().checkUndefined();
	req.check('lat', 'Lattiude is required and and value should be [0.0-90.0]').isDecimal().isLat();
	req.check('long','Longitude is required and and value should be [0.0-1800.0]').isDecimal().isLong();
	req.check('emotion', 'Emotion is required').notEmpty().checkUndefined();

	
	let errors=req.validationErrors();

	if(errors){
		return next(errors);
	}


	let name=req.body.locationName;
	let emotion=req.body.emotion;
	let location=[parseFloat(req.body.lat),parseFloat(req.body.long)];
	let geometry={
		coordinates:location
	}

	let newLocation= new Location({
                        locationName:name,
						geometry,
						emotion
					});


	Location.create(newLocation)
		.then(data =>res.json({
			"message":data
		}))
		.catch(err =>next(err));

});

router.get('/emotion',(req,res,next)=>{

	req.checkQuery('lat', 'Lattiude is required and value should be [0.0-90.0]').isDecimal().isLat();
	req.checkQuery('long','Longitude is required and value should be [0.0-180.0]').isDecimal().isLong();

	let errors=req.validationErrors();

	if(errors){
		return next(errors);
	}
	
	let location=[parseFloat(req.query.lat),parseFloat(req.query.long)];
	Location.search(location)
			.then(data =>res.send(data))
			.catch(err =>next(err));

});


module.exports=router;
'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const GeoSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }

});

const EmotionSchema = mongoose.Schema({
    locationName: {
        type: String
    },
    emotion: {
        type: String,
        enum: ['happy', 'angry', 'sad', 'neutral']
    },
    geometry: GeoSchema
});

var locationBasedSearch = module.exports = mongoose.model('emotion', EmotionSchema);


module.exports.create = (data) => {
    return new Promise((resolve, reject) => {
        data.save(err => {
            if (err) {
                return reject(err);
            }
            return resolve('Emotion created');
        });

    });
}

module.exports.search = (location) => {
    return new Promise((resolve, reject) => {
        locationBasedSearch.aggregate([
            {
                $geoNear: {
                    near:
                        {
                            type: "Point",
                            coordinates: location
                        },
                    distanceField: "distance",
                    maxDistance: 100000,
                    num: 5,
                    spherical: true
                }
            },
            {
                $project:
                    { "geometry.coordinates": 1, "emotion": 1, "distance": 1, "locationName": 1, _id: 0 }
            },
            {
                $group:
                    { _id: { "geometry": "$geometry", "distance": "$distance", "locationName": "$locationName" }, "emotion": { "$push": "$emotion" } }
            },
            { $sort: { "_id.distance": 1 } }
        ]).exec((err, locations) => {
            if (err) reject(err);

            let nearByLocation = locations.map(l => ({
                "name":l._id.locationName,
                "lat": l._id.geometry.coordinates[0],
                "long": l._id.geometry.coordinates[1],
                "dist": l._id.distance
            }))

            let temp;
            for (let loc in locations) {
                temp = locations[loc].emotion.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
                nearByLocation[loc] = Object.assign(nearByLocation[loc], temp);
            }
            resolve(nearByLocation);
        })

    });
}


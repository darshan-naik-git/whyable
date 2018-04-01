const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const whyableRoute = require('./routes/whyableRoute');

const init=require('./init')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;

app.use(expressValidator({
    customValidators: {
        checkUndefined: value => value !== 'undefined',
        isLat: inpLat => lat.test(inpLat.toString()),
        isLong: inpLong => long.test(inpLong.toString()),
        isDecimal: num => !isNaN(num)
    }
}));

mongoose.connect('mongodb://localhost/whyable', (err,db) => {

    if (err) res.status(err.status || 500).send(err);

    app.set('port', (process.env.PORT || 3000));

    app.listen(app.get('port'), () => {
        console.log('Ready to go on port :' + app.get('port'));
    });

});


app.use('/api', whyableRoute);

app.get('/', (req, res) => {
    res.json({
        'msg': 'Welcome to Whyable'
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        'err': err
    });
});
let sample = require('./sampleData');
let Location = require('./models/location');


let init = () => {
    return new Promise((resolve, reject) => {
        Location.count()
            .then(_d => {
                if (_d == 0) {
                    console.log('Loading new data points...');
                    Location.insertMany(sample)
                        .then((docInserted) => {
                            console.log(docInserted.length+' new data points inserted in emotions collection');
                            resolve();
                        })
                }
            }).catch((err) => {
                console.error(err)
                reject(err);
            });
    });
}
init()
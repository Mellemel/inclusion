var fs = require('fs');
var Sequelize = require('sequelize');
var sq = new Sequelize('inclusion', 'Mel', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
})

sq.authenticate()
    .then(function() {
        console.log("Successfully established connection");
    })
    .catch(function(err) {
        console.log("unable to connect to database", err);
    })
// fs.readFile('baby-names.csv', function (err, data) {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     var parsedData = data.toString('utf-8')
//     var result = parsedData.split('\n').slice(1).map(function(intel) {
//        var pieceOfData = intel.split(',')
//        return {
//            birthYear: parseInt(pieceOfData[0]),
//            gender: pieceOfData[1],
//            ethnicity: pieceOfData[2],
//            name: pieceOfData[3],
//            count: parseInt(pieceOfData[4]),
//            rank: parseInt(pieceOfData[5]),
//        } 
//     })
//     console.log(result[0])
// })
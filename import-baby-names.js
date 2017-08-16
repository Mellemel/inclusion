var fs = require('fs');
var database = require('./database');

fs.readFile('baby-names.csv', function (err, data) {
    if (err) {
        console.log(err)
        throw err
    }
    var parsedData = data.toString('utf-8')
    var result = parsedData.split('\n').slice(1).map(function (intel) {
        var pieceOfData = intel.split(',')
        return {
            birthYear: parseInt(pieceOfData[0]),
            gender: pieceOfData[1],
            ethnicity: pieceOfData[2],
            name: pieceOfData[3],
            count: parseInt(pieceOfData[4]),
            rank: parseInt(pieceOfData[5]),
        }
    })
    database.babyName.sync({ force: true }).then(() => {
        database.babyName.bulkCreate(result)
    }).catch((err)=>{
        console.log(err)
    })
})
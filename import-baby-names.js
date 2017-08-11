var fs = require('fs');
var sequelize = require('sequelize');
var sq = new sequelize('postgres://Mel@localhost:5432/inclusion');
sq.authenticate()
    .then(function () {
        console.log("Successfully established connection");
    })
    .catch(function (err) {
        console.log("unable to connect to database", err);
    })
var babyNameTemplate = sq.define('babyName', {
    birthYear: {
        type: sequelize.INTEGER
    },
    gender: {
        type: sequelize.STRING
    },
    ethnicity: {
        type: sequelize.STRING
    },
    name: {
        type: sequelize.STRING
    },
    count: {
        type: sequelize.INTEGER
    },
    rank: {
        type: sequelize.INTEGER
    }
})

fs.readFile('baby-names.csv', function (err, data) {
    if (err) {
        console.log(err)
        throw err
    }
    var parsedData = data.toString('utf-8')
    var result = parsedData.split('\n').slice(1).map(function (intel) {
        var pieceOfData = intel.split(',')
        return {
            birthYear: parseInt(pieceOfData[0]) || 0,
            gender: pieceOfData[1] || '',
            ethnicity: pieceOfData[2] || '',
            name: pieceOfData[3] || '',
            count: parseInt(pieceOfData[4]) || 0,
            rank: parseInt(pieceOfData[5]) || 0,
        }
    })
    babyNameTemplate.sync({ force: true }).then(() => {
        babyNameTemplate.bulkCreate(result)
    }).catch((err)=>{
        console.log(err)
    })
})
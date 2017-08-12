var sequelize = require('sequelize')
var sq = new sequelize('postgres://Mel@localhost:5432/inclusion')

module.exports = sq.define('babyName', {
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
var sequelize = require('sequelize')
var sq = new sequelize('postgres://Jackssanchez@localhost:5432/inclusion')

var userTemplate = sq.define('User', {
    email: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
    name: {
        type: sequelize.STRING
    },
    admin: {
        type: sequelize.BOOLEAN
    }
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
userTemplate.sync()
babyNameTemplate.sync()
module.exports = {
    User: userTemplate,
    babyName: babyNameTemplate
}
var sequelize = require('sequelize')
var sq = new sequelize('SSIS', 'terron23', 'kobesmalls23', {
    dialect: 'mssql',
  server: 'localhost\\TMJSQLEXPRESS', //'LAPTOP-5QCDNMK9\
  port: '1433',
  driver: 'msql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
const sql = require('mssql');

sq.authenticate()
    .then(function() {
        console.log("Successfully Connected");
    })
    .catch(function (err) {
        console.log("Unable to connect to db", err);
    });

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
var babyNameTemplate = sq.define('babyNames', {
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
// retrieving 
const express = require('express');
const database = require('./database');
const jwt = require('express-jwt');
const app = express();

app.use(function (req, res, next) {
    console.log(req.headers)
    next()
})

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.get('/baby-names', jwt({secret: 'I Love Lucy'}),function(request, response) {
    database.babyName.findAll().then(function(data) {
        response.json(data)
    })
})
app.get('/baby-names/top-ten', function(request, response) {
    database.babyName.findAll({
        order: [['count', 'DESC']],
        limit: 10
    }).then(function(data){
        response.json(data)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
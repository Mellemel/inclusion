// retrieving 
const express = require('express');
const database = require('./database');
const bodyparser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken')
const app = express();


app.use(bodyparser())

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.post('/login', function(request, response){
    database.User.findAll({
        where: {
            email: request.body.email
        }
    }).then(function(data){
        const user = data[0].dataValues
        if (user.password === request.body.password) {
            response.send("its the same")
            
        }
        const token = jwt.sign({
            name: user.name,
            admin: user.admin
        }, 'ilovelucy', {
            expiresIn: 60
        })
        console.log(token)
        response.setHeader('Authorization', token.toString())
        response.json(response.header)
    })
})

app.post('/user', function(request, response){
    console.log(request.method)
    console.log(request.headers)
    console.log(request.body)
    database.User.create({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        admin: false
    }).then(function(){
        response.sendStatus(201)
    })
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
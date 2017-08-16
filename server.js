// retrieving 
const express = require('express');
const database = require('./database');
const bodyparser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken')
const app = express();
const jwtSecret = 'ilovelucy'

app.use(bodyparser());
app.use(express.static('public'))

// Registering '/' route to the express app. e.g. www.google.com/
app.get('/', function (request, response) {
    // sending plain text back to the client
    response.send('Hello World!')
})

// registering '/' route to the express app. e.g. www.google.com/login
app.post('/login', function(request, response){
    database.User.findAll({
        where: {
            email: request.body.email
        }
    }).then(function(data){
        const user = data[0].dataValues
        if (user.password === request.body.password) {
            const token = jwt.sign({
                name: user.name,
                admin: user.admin
            }, jwtSecret, {
                expiresIn: 60 * 2
            })
            console.log(token)
            response.setHeader('Authorization', token.toString())
            response.json(token)
        } else {
            response.sendStatus(403)
        }
    })
})

//curl http://localhost:3000/baby-names --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWVsIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MDI3NTgwMDgsImV4cCI6MTUwMjc1ODEyOH0.l2liPNomAVLdNK7iTRlmfTXmQHIp8yQFAa4oCgEeL_Y"

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

app.get('/baby-names', jwtMiddleware({secret: secret}), function(request, response) {
    database.babyName.findAll().then(function(data) {
        response.json(data)
    })
})
app.get('/baby-names/top-ten', jwtMiddleware({secret: secret}), function(request, response) {
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
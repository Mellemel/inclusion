// retrieving 
const express = require('express');
const database = require('./database');
const bodyparser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
const app = express();
const jwtSecret = 'ilovelucy';

app.use(bodyparser());
app.use(express.static('public'));

app.get("/log", (req, res) => {
 res.sendFile(__dirname + "/public/login.html");
});

// registering '/login' route to the express app. e.g. www.google.com/login
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

// registering '/user' route. e.g. www.google.com/user
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



// registering '/user' route. e.g. www.google.com/user
app.get('/baby-names', function(request, response) {
    database.babyName.findAll().then(function(data) {
        response.json(data)
    })
})

// registering '/baby-names/top-ten'. e.g. www.google.com/user
app.get('/baby-names/top-ten', function(request, response) {
    database.babyName.findAll({
        order: [['count', 'DESC']],
        limit: 20
    }).then(function(data){
        response.json(data)
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
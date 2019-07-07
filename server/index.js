require('dotenv').config()
const express = require('express'),
    bcrypt = require('bcrypt')
    massive = require('massive'),
    session = require('express-session'),
    authController = require('./controllers/authController'),
    treasureController = require('./controllers/treasureController'),
    authMiddleware = require('./middleware/authMiddleware')
    app = express(),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
        app.set('db', db)
        console.log(`dbworks :)`)
    })
    .catch(error => console.log(`error in Massive: ${error} :()`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4 // month
    }
}))



// auth 
app.post('/auth/register', authController.register)
app.post('/auth/login', authController.login)
app.get('/auth/logout', authController.logout)

// treasure 
app.get('/api/treasure/dragon', treasureController.dragonTreasure)
app.get('/api/treasure/user', authMiddleware.usersOnly, treasureController.getUserTreasure)
app.post('/api/treasure/user', authMiddleware.usersOnly, treasureController.addUserTreasure)
app.get('/api/treasure/all', authMiddleware.adminsOnly, treasureController.getAllTreasure)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})
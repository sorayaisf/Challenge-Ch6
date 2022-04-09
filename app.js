//Load the things we need
const express = require('express');
const app = express();
const morgan = require('morgan');
const {
    user
} = require('pg/lib/defaults');
const userController = require('./controllers/userController');
const {
    sequelize,
} = require('./models')
const users = require('./public/db/users.json')

//Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(morgan('tiny'));


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

const game = require("./routes/game")

app.use(game)


// Index or Home Page
app.get('/', userController.homeRender)


// Login Page
app.get('/login', userController.loginGet)


//Playing Game
app.get('/game', userController.gameRender)


// 404 Page
app.use('/', userController.errorRender)



app.listen({
    port: 3000
}, async () => {
    console.log('Server up on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database Connected!')

})
//Load the things we need
const express = require('express');
const app = express();
const morgan = require('morgan');
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
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
    });
});


// Login Page
app.get('/login', (req, res) => {
    res.render('login/index', {
        title: "Login Page",
    });
});

app.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body
    for (user of users) {
        if (user.email === email && user.password === password) {
            return res.redirect('game')
        }
    }
    res.status(400).render('alert')
})


//Playing Game
app.get('/game', (req, res) => {
    res.render('game', {})
})


// 404 Page
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen({
    port: 3000
}, async () => {
    console.log('Server up on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database Connected!')

})
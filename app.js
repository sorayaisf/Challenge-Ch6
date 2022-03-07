//Load the things we need
const express = require('express');
const app = express();
const port = 8080
const morgan = require('morgan');
const users = require('./public/db/users.json')

//Set the view engine to ejs
app.set('view engine', 'ejs');

//Express
app.use(express.static('public'))

//Logger Middleware
app.use(morgan('tiny'));


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// use res.render to load up an ejs view file //

// Index or Home Page
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
    });
});

// Users Page
app.get('/users', (req, res) => {
    console.log(users)
    res.status(200).json(users)
});


//Sign Up Page
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: "Sign Up Page",
    })
})

//Playing Game
app.get('/game', (req, res) => {
    res.render('game', {

    })
})

// Login Page
app.get('/login', (req, res) => {
    res.render('login/index', {
        title: "Login Page",
    });
});

//Sign Up to Login Page
app.get('/signup', (req, res) => {
    res.render('login/index', {
        title: "Login Page",
    });
});

app.post('/signup', (req, res) => {
    const {
        email,
        password
    } = req.body

    const newUser = ({
        email,
        password
    })
    users.push(newUser)
    res.status(200).redirect('/login')
})


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

//Play Now
app.get('/playnow', (req, res) => {
    res.render('/login'), {

    }
})

//404 Page
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
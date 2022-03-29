//Load the things we need
const express = require('express');
const app = express();
// const port = 8000
const morgan = require('morgan');
const {
    sequelize,
    UserGame,
    UserGameBiodata,
} = require('./models')
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



// Index or Home Page
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page",
    });
});


//CREATE

app.get('/users/create', (req, res) => {
    res.render('create_user');
});
app.post('/users/create', (req, res) => {
    const {
        email,
        username,
        password,
        name
    } = req.body;

    console.log({
        email,
        username,
        password,
        name

    })

    UserGame.create({
        email,
        username,
        password
    }).then((newUser) => {
        UserGameBiodata.create({
            name,
            userId: newUser.id,
        });
        res.status(201).json((error) => {
            res.status(422).json("Can't create user", error);
        });
    });
});


// READ
app.get('/users', (req, res) => {
    UserGame.findAll({
            include: UserGameBiodata,
        })
        .then((data) => {
            console.log({
                data
            })
            res.render('users', {
                data
            });
        })
        .catch((error) => {
            console.log('oopps! something wrong', error);
        });
});


// UPDATE
app.get('/users/update/:id', (req, res) => {
    UserGame.findOne({
        where: {
            id: req.params.id
        },
        include: UserGameBiodata,
    }).then((user) => {
        res.render('update_user', {
            user
        });
    });
});
app.post('/users/update/:id', (req, res) => {
    const {
        email,
        username,
        password,
        name
    } = req.body;

    UserGame.update({
            email,
            username,
            password
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then((user) => {
            UserGame.findOne({
                where: {
                    id: req.params.id
                },
                include: UserGameBiodata,
            }).then((user1) => {
                UserGameBiodata.update({
                    name,
                }, {
                    where: {
                        id: user1.UserGameBiodatum.id
                    }
                });
                res.status(201);
            });
        })
        .catch((error) => {
            res.status(400).json("Can't update user", error);
        });
});

// DELETE
app.get('/users/delete/:id', (req, res) => {
    UserGame.destroy({
        where: {
            id: req.params.id
        },
        returning: true
    }).then(
        (_) => {
            res.redirect('/users');
        }
    );
});



// // // Users Page
// app.get('/users', (req, res) => {
//     console.log(users)
//     res.status(200).json(users)
// });


//Sign Up Page
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: "Sign Up Page",
    })
})

//Playing Game
app.get('/game', (req, res) => {
    res.render('game', {})
})




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




// //Play Now
// app.get('/playnow', (req, res) => {
//     res.render('/login'), {

//     }
// })

// //404 Page
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
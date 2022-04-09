const router = require("express").Router();
const {
    redirect
} = require("express/lib/response");

const {
    UserGame,
    UserGameBiodata,
} = require("./../models")


//Create
router.get('/users/create', (req, res) => {
    res.render('game/create_user', {
        title: "Create User"
    });
});

router.post('/users/create', (req, res) => {
    const {
        email,
        username,
        password,
        name
    } = req.body;


    UserGame.create({
        email,
        username,
        password
    }).then((newUser) => {
        UserGameBiodata.create({
            name,
            userId: newUser.id,
        });

        res.status(201).redirect(('/users'));
    });
});


//Login
router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body

    const userFind = UserGame.findOne({
        where: {
            email,
            password
        }
    })

    if (userFind) {
        res.redirect(`/game?username=${userFind.username}`)
        console.log(userFind.username + userFind.id)
    } else {
        res.status(404).render('alert')
        console.log("Failed!")
    }

})


// Read
router.get('/users', (req, res) => {
    UserGame.findAll({
            include: UserGameBiodata,
        })
        .then((data) => {
            console.log({
                data
            })
            res.render('game/users', {
                data,
                title: "List of Users"
            });
        })
        .catch((error) => {
            console.log('Failed', error);
        });
});


// Update
router.get('/users/update/:id', (req, res) => {
    UserGame.findOne({
        where: {
            id: req.params.id
        },
        include: UserGameBiodata,
    }).then((user) => {
        res.render('game/update_user', {
            user
        });
    });
});
router.post('/users/update/:id', (req, res) => {
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
            }).then((newUsers) => {
                UserGameBiodata.update({
                    name,
                }, {
                    where: {
                        id: newUsers.UserGameBiodatum.id
                    }
                });
                res.status(201);
            });
        })
        .catch((error) => {
            res.status(400).json("Can't update user", error);
        });
});


// Delete
router.get('/users/delete/:id', (req, res) => {
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

module.exports = router;
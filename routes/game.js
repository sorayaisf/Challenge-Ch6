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

        res.status(201).redirect(('/users'));
    });
});


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
                data
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
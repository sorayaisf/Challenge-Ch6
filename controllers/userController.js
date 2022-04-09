const Sequelize = require('sequelize');
const res = require("express/lib/response");

module.exports = {


    homeRender: async (req, res) => {
        res.render('index', {
            title: "Home Page",
        });
    },

    loginGet: async (req, res) => {
        res.render('login', {
            title: "Login Page"
        })
    },

    gameRender: async (req, res) => {
        res.render('game')
    },


    errorRender: async (req, res) => {
        res.status(404);
        res.send('<h1>404</h1>')
    }


}
const express = require('express')
const {
    user
} = require('pg/lib/defaults')

const {
    sequelize,
    UserGame,
    UserGameBiodata,
} = require('./models')
const users = require('./public/db/users.json')
// const usergamebiodata = require('./models/usergamebiodata')

const app = express()
app.use(express.json())

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































// app.post('/users', async (req, res) => {
//     const {
//         username,
//         password
//     } = req.body

//     try {
//         const user = await UserGame.create({
//             username,
//             password
//         })
//         return res.json(user)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// app.get('/users/:uuid', async (req, res) => {
//     const uuid = req.params.uuid

//     try {
//         const users = await UserGame.findOne({
//             where: {
//                 uuid
//             }
//         })

//         return res.json(users)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({
//             error: 'Something went wrong'
//         })
//     }
// })

// app.post('/biodata', async (req, res) => {
//     const {
//         userUuid,
//         name,
//         city,
//         hobby
//     } = req.body

//     try {
//         const user = await UserGame.findOne({
//             where: {
//                 uuid: userUuid
//             }

//         })

//         const user1 = await UserGameBiodata.create({
//             name,
//             userId: userUuid,
//             city,
//             hobby,

//         })

//         return res.json(user1)

//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })


// app.get('/biodata', async (req, res) => {

//     try {
//         const user1 = await UserGameBiodata.findAll({
//             include: [UserGame]
//         })

//         return res.json(user1)

//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })




app.listen({
    port: 8080
}, async () => {
    console.log('Server up on http://localhost:8080')
    await sequelize.authenticate()
    console.log('Database Connected!')

})
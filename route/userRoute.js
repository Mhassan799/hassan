const express = require('express')
const router = express.Router()
const {verifyToken} = require('../jwtmiddleware/jwtmiddleware')

const {createUser, login , getUser } = require('../controller/userController')

router.post('/createUser', createUser)
router.post('/login', login)


router.get('/getUser', verifyToken, getUser)
module.exports = router


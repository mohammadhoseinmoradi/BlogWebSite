const express = require('express');
const router = express.Router()
const Session_Check = require('../../tools/Sessions/Session')
const { LoginPage, User_Login } = require('../Services/UserLogin')

router.get('/', Session_Check.sessionChecker, LoginPage)
router.post('/UserLogin', User_Login)

module.exports = router
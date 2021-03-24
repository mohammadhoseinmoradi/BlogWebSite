const express = require('express');
const router = express.Router()
const Session_Check = require('../../tools/Sessions/Session')
const { SingUpPage, User_Register } = require('../Services/UserSingUp')

router.get('/', Session_Check.sessionChecker, SingUpPage)
router.post('/Register', User_Register)

module.exports = router
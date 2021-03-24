const express = require('express');
const router = express.Router();
const Session_Check = require('../../tools/Sessions/Session')
const SingUpUser = require('./UserSingUp')
const LoginUser = require('./UserLogin')
const UserDashboard = require('./UserDashboard')
const Public = require('./Public')
const { HomePage } = require('../Services/Api')

router.get("/", HomePage)
router.use('/public', Public)
router.use('/SingUpUser', SingUpUser)
router.use('/LoginUser', LoginUser)
router.use('/DashboardUser', Session_Check.loginChecker, UserDashboard)

module.exports = router;
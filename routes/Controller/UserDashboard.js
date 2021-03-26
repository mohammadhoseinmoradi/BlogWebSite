const express = require('express');
const router = express.Router()
const { DashboardPage, DashboardChangPassword, DashboardEdit, DashboardLogOut, DashboardDelete, DashboardAvatar } = require('../Services/UserDashboard')
router.get('/DashboardPage', DashboardPage)
router.put('/DashboardEdit', DashboardEdit)
router.put('/DashboardChangPassword', DashboardChangPassword)
router.get('/DashboardLogOut', DashboardLogOut)
router.get('/DashboardDelete', DashboardDelete)
router.put('/DashboardAvatar', DashboardAvatar)
module.exports = router
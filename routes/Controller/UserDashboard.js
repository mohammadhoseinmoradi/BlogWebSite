const express = require('express');
const router = express.Router()
const { DashboardPage, DashboardChangPassword, DashboardEdit, DashboardLogOut, DashboardDelete } = require('../Services/UserDashboard')
router.get('/DashboardPage', DashboardPage)
router.put('/DashboardEdit', DashboardEdit)
router.put('/DashboardChangPassword', DashboardChangPassword)
router.get('/DashboardLogOut', DashboardLogOut)
router.delete('/DashboardDelete', DashboardDelete)
module.exports = router
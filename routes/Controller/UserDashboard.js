const express = require('express');
const router = express.Router()
const Avatar = require('../../tools/Get_Avatar/Avatar')
const { DashboardPage, DashboardChangPassword, DashboardEdit, DashboardLogOut, DashboardDelete, DashboardAvatar, BloggerInfo } = require('../Services/UserDashboard')
router.get('/DashboardPage', DashboardPage)
router.put('/DashboardEdit', DashboardEdit)
router.put('/DashboardChangPassword', DashboardChangPassword)
router.get('/DashboardLogOut', DashboardLogOut)
router.get('/DashboardDelete', DashboardDelete)
router.post('/DashboardAvatar', DashboardAvatar)

router.get('/BloggerInfo', BloggerInfo)


module.exports = router
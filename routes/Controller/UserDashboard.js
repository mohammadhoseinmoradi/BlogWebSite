const express = require('express');
const router = express.Router()
const Avatar = require('../../tools/Get_Avatar/Avatar')
const { DashboardPage, DashboardChangPassword, DashboardEdit, DashboardLogOut, DashboardDelete, DashboardAvatar, BloggerInfo, ResetPassword, DeleteCommentsUsers } = require('../Services/UserDashboard')
router.get('/DashboardPage', DashboardPage)
router.put('/DashboardEdit', DashboardEdit)
router.put('/DashboardChangPassword', DashboardChangPassword)
router.get('/DashboardLogOut', DashboardLogOut)
router.get('/DashboardDelete', DashboardDelete)
router.post('/DashboardAvatar', DashboardAvatar)
router.get('/BloggerInfo', BloggerInfo)
router.get('/DeleteCommentsUsers/:id', DeleteCommentsUsers)
router.put('/ResetPassword/:id', ResetPassword)

module.exports = router
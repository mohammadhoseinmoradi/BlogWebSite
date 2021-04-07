const express = require('express');
const router = express.Router();


const { AddArticles, PersonalArticle, UploadPhotos, SubmitArticle, UploadAvatar } = require('../Services/Article')

router.post('/AddArticles', AddArticles)
router.get('PersonalArticle', PersonalArticle)
router.post('/AddArticlesPhotos', UploadPhotos)
router.post('/SubmitArticle', SubmitArticle)
router.post('/UploadAvatarArticle', UploadAvatar)
module.exports = router;
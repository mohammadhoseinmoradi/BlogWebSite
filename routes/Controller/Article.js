const express = require('express');
const router = express.Router();


const { AddArticles, PersonalArticle, UploadPhotos, SubmitArticle, UploadAvatar, EditArticleTitle, EditPhotos } = require('../Services/Article')

router.post('/AddArticles', AddArticles)
router.get('/PersonalArticle/:id', PersonalArticle)
router.post('/AddArticlesPhotos', UploadPhotos)
router.post('/EditArticlesPhotos/:id', EditPhotos)
router.post('/SubmitArticle', SubmitArticle)
router.post('/UploadAvatarArticle', UploadAvatar)

router.put('/EditArticleTitle', EditArticleTitle)


module.exports = router;
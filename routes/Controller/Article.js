const express = require('express');
const router = express.Router();


const { AddArticles, PersonalArticle, UploadPhotos, SubmitArticle, UploadAvatar, EditArticleTitle, EditPhotos, ArticlePage, AllArticles } = require('../Services/Article')
router.get('/', AllArticles)
router.get('/ArticlePage/:id', ArticlePage)
router.post('/AddArticles', AddArticles)
router.get('/PersonalArticle/:id', PersonalArticle)
router.post('/AddArticlesPhotos', UploadPhotos)
router.post('/EditArticlesPhotos/:id', EditPhotos)
router.post('/SubmitArticle', SubmitArticle)
router.post('/UploadAvatarArticle', UploadAvatar)

router.put('/EditArticleTitle', EditArticleTitle)


module.exports = router;
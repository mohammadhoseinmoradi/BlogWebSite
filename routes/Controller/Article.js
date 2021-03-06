const express = require('express');
const router = express.Router();


const { AddArticles, PersonalArticle, UploadPhotos, SubmitArticle, UploadAvatar, EditArticleTitle, EditPhotos, ArticlePage, AllArticles, SubmitComment, DeleteArticle, UserArticles, NewArticlePage } = require('../Services/Article')
router.get('/', AllArticles)
router.get('/ArticlePage/:id', ArticlePage)
router.get('/UserArticles/:id', UserArticles)





router.post('/AddArticles', AddArticles)
router.get('/PersonalArticle/:id', PersonalArticle)
router.get('/NewArticlePage', NewArticlePage)
router.post('/AddArticlesPhotos', UploadPhotos)
router.post('/EditArticlesPhotos/:id', EditPhotos)
router.post('/SubmitArticle', SubmitArticle)
router.post('/UploadAvatarArticle', UploadAvatar)
router.put('/EditArticleTitle', EditArticleTitle)
router.post('/SubmitComment', SubmitComment)
router.delete('/:id', DeleteArticle)


module.exports = router;
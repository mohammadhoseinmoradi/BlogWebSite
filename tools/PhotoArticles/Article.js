const path = require('path');
const multer = require('multer');

const upload_PhotosArticle = {};




const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {

        cb(null, path.join(__dirname, '/../../public/images/ArticlesPhotos'))
    },
    filename: function(req, file, cb) {



        cb(null, `${req.session.user.User_id}-${req.session.user.Article_Id}-${Date.now()}-${file.originalname}`)
    }
});


upload_PhotosArticle.uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: function(req, file, cb) {
        console.log(3000000000000000000000000000000000000000000000);
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)

        } else {
            console.log(40000000000000000000000000000000000000000000000);
            cb(new Error('invalid type!'), false);

        }
    }
})





module.exports = upload_PhotosArticle;
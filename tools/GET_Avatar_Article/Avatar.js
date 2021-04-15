const path = require('path');
const multer = require('multer');

const upload_Avatar = {};




const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let a = path.join(__dirname, '/../../public/images/ArticleAvatar');
        cb(null, path.join(__dirname, '/../../public/images/ArticleAvatar'))
    },
    filename: function(req, file, cb) {
        let a = `${req.session.user.User_id}-${req.session.user.Article_Id}-${Date.now()}-${file.originalname}`;
        console.log(a);
        cb(null, `${req.session.user.User_id}-${req.session.user.Article_Id}-${Date.now()}-${file.originalname}`)
    }
});


upload_Avatar.uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)

        } else {
            cb(new Error('invalid type!'), false);

        }
    }
})





module.exports = upload_Avatar;
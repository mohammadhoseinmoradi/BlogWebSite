const path = require('path');
const multer = require('multer');
let Avatar = {}
const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        let a = path.join(__dirname, '../../public/images/avatars');
        cb(null, path.join(__dirname, '../../public/images/avatars'))
    },
    filename: function(req, file, cb) {
        console.log(file);
        let a = `${req.session.user}-${Date.now()}-${file.originalname}`;
        cb(null, `/images/avatars/${req.session.user}-${Date.now()}-${file.originalname}`)
    }
});


Avatar.uploadAvatar = multer({

    storage: avatarStorage,

    fileFilter: function(req, file, cb) {
        console.log(file);
        // !file.originalname.match(/\.(jpg|jpeg|png)$/)
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true)

        } else {
            cb(new Error('invalid type!'), false);

        }
    }
})
module.exports = Avatar;
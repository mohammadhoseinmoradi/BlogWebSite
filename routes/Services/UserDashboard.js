const express = require('express')
const User_Information = require('../../Models/User')
const Article_Information = require('../../Models/Article')
const Comment_Information = require('../../Models/Comment')
const bcrypt = require('bcrypt')
const Error_handling = require('../../tools/ErrorHandling/ErrorHandling')
const Avatar = require('../../tools/Get_Avatar/Avatar')
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const saltRounds = 10;

const DashboardPage = (req, res) => {
    if (req.session.user.User_Role == "admin") {


        User_Information.findOne({ _id: req.session.user.User_id }, (err, existUser) => {

            if (err) return res.status(500).send('Server Error gfhfhgfhgf:(')
            console.log("Admin Info");
            console.log(existUser);
            let admin = { moradi: "ali" }
            res.render('DashboardAdmin', { existUser, admin })
        })


    } else if (req.session.user.User_Role == "blogger") {
        Article_Information.find({ Article_Owner: req.session.user.User_id }, (err, existArticle) => {
            if (err) return res.status(500).send('Server Error22222222222222222222222222 :(')
            if (!existArticle) { return res.status(500).send('Server Erro333333333333333333333333333r :(') }


            User_Information.find({ _id: req.session.user.User_id }, (err, existUser) => {

                if (err) return res.status(500).send('Server Error gfhfhgfhgf:(')

                res.render('Dashboard', { existUser, existArticle })
            })

        })
    } else {
        return res.status(500).send('Server Error gfhfhgfhgf:(')
    }




}
const DashboardEdit = (req, res) => {


    let Body_Keys = Object.keys(req.body)

    if (Body_Keys.length == 5) {
        User_Information.findOneAndUpdate({
            _id: req.session.user.User_id
        }, {
            $set: {


                User_Name: req.body.User_Name,
                User_First_Name: req.body.User_First_Name,
                User_Last_Name: req.body.User_Last_Name,
                User_Email: req.body.User_Email,
                User_Number: req.body.User_Number,
            }
        }, (err, existUser) => {
            if (err) return res.status(500).send();
            if (existUser.length == 0) return res.status(500).send();
            res.send("User Has Edited")
        })
    } else if (Body_Keys.length == 6) {
        User_Information.findOneAndUpdate({
            _id: req.session.user.User_id
        }, {
            $set: {


                User_Name: req.body.User_Name,
                User_First_Name: req.body.User_First_Name,
                User_Last_Name: req.body.User_Last_Name,
                User_Gender: req.body.User_Gender,
                User_Email: req.body.User_Email,
                User_Number: req.body.User_Number,
            }
        }, (err, existUser) => {
            if (err) return res.status(500).send();
            if (existUser.length == 0) return res.status(500).send();
            res.send("User Has Edited")
        })
    } else {
        return res.status(500).send();
    }

}

const DashboardChangPassword = (req, res) => {



    New_Password = req.body.New_Password
    Old_Password = req.body.Old_Password
    User_Information.find({ _id: req.session.user.User_id }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (existUser.length == 0) return res.status(500).send();
        bcrypt.compare(Old_Password, existUser[0].User_Password, function(err, result) {

            if (err) return res.status(500).send();
            if (result == true) {
                bcrypt.hash(New_Password, saltRounds, function(err, HashPassword) {
                    if (err) return res.status(500).send();
                    User_Information.findOneAndUpdate({
                        _id: req.session.user.User_id
                    }, {
                        $set: {
                            User_Password: HashPassword,
                        }
                    }, (err, UpdateUser) => {
                        if (err) return res.status(500).send();

                        req.session.destroy(function(err) {
                            if (err) return res.status(500).send();
                        });

                        res.send('User Password is Changed')

                    });
                });
            } else {
                return res.status(500).send();
            }
        });
    })



}
const DashboardLogOut = (req, res) => {
    req.session.destroy(function(err) {
        if (err) return res.status(500).send();

    });
    res.redirect('/LoginUser')
}
const DashboardDelete = (req, res) => {
    User_Information.findOneAndDelete({ _id: req.session.user.User_id }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (!existUser) return res.status(500).send();
        req.session.destroy(function(err) {
            if (err) return res.status(500).send();
        });
        res.redirect('/LoginUser')
    })
}
const DashboardAvatar = (req, res) => {

    const upload = Avatar.uploadAvatar.single('avatar');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {

            res.status(500).send('Server Error!')
        } else if (err) {
            res.status(404).send(err.message)
        } else {

            User_Information.findByIdAndUpdate(req.session.user.User_id, { User_Avatar: req.file.filename }, { new: true }, (err, user) => {


                if (err) {
                    res.status(500).json({ msg: 'Server Error!' })
                } else {
                    if (req.session.user.User_Avatar && req.session.user.User_Avatar !== "Default.png") {


                        fs.unlink(path.join(__dirname, '../../public/images/avatars', req.session.user.User_Avatar), err => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                            } else {
                                req.session.user.User_Avatar = req.session.user.User_Avatar;

                                res.redirect('/DashboardUser/DashboardPage');
                            }
                        })

                    } else {
                        req.session.user.User_Avatar = req.session.user.User_Avatar;

                        res.redirect('/DashboardUser/DashboardPage');
                    }
                }
            });
        }
    })

}
const BloggerInfo = (req, res) => {
    User_Information.find({}, (err, user) => {
        if (err) return res.status(500).json({ msg: "Users Not Found" })
        res.json(user)
    })


}
const DeleteCommentsUsers = (req, res) => {
    let User_Id = req.params.id
    Comment_Information.deleteMany({ Comment_Owner: User_Id }, (err, comments) => {
        if (err) return res.status(500).json({ msg: "Server Not Found" })
        if (comments.length == 0) { return res.send("User Don't Have Comments") }
        res.send('Comments User Deleted')
    })
}

const ResetPassword = (req, res) => {

    User_Information.findOne({
        _id: req.params.id
    }, (err, existUser) => {

        if (err) {
            console.log("33333333333333");
            console.log(err);
            if (err) return res.status(500).send();

        }
        console.log(existUser);
        if (!existUser) {
            console.log("22222222222222222");
            console.log(err);
            return res.status(500).send();

        }
        let NewPassword = existUser.User_Number
        bcrypt.hash(NewPassword, saltRounds, (err, HashPassword) => {
            if (err) {
                console.log("3333333333333333");
                console.log(err);
                if (err) return res.status(500).send();

            }
            User_Information.updateOne({ _id: req.params.id }, { $set: { User_Password: HashPassword } }, (err, result) => {
                if (err) return res.status(500).send();
                console.log("===>hash");
                console.log(HashPassword);
                res.send("Password updated")
            })
        })
    })
}
module.exports = {
    DashboardDelete,
    DashboardChangPassword,
    DashboardEdit,
    DashboardLogOut,
    DashboardPage,
    DashboardAvatar,
    BloggerInfo,
    DeleteCommentsUsers,
    ResetPassword
}
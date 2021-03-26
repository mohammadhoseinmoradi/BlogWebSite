const express = require('express')
const User_Information = require('../../Models/User')
const bcrypt = require('bcrypt')
const Error_handling = require('../../tools/ErrorHandling/ErrorHandling')
const Avatar = require('../../tools/Get_Avatar/Avatar')
const path = require('path');
const multer = require('multer');
const saltRounds = 10;

const DashboardPage = (req, res) => {
    console.log("hhfhhggggggggggggggggggggggggggggggggggggggggggggggg");
    console.log(req.session.user);
    User_Information.find({ _id: req.session.user }, (err, existUser) => {
        console.log(existUser);
        if (err) return res.status(500).send('Server Error :(')
        if (existUser.length == 0) { return res.status(500).send('Server Error :(') }
        res.render('Dashboard', { existUser })
    })
}
const DashboardEdit = (req, res) => {
    console.log(1212121212121212121);
    console.log(req.body);
    let Body_Keys = Object.keys(req.body)
    console.log(Body_Keys);
    if (Body_Keys.length == 5) {
        User_Information.findOneAndUpdate({
            _id: req.session.user
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
            _id: req.session.user
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
    console.log(53453453454345345345);
    console.log(req.body);

    New_Password = req.body.New_Password
    Old_Password = req.body.Old_Password
    User_Information.find({ _id: req.session.user }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (existUser.length == 0) return res.status(500).send();
        bcrypt.compare(Old_Password, existUser[0].User_Password, function(err, result) {

            if (err) return res.status(500).send();
            if (result == true) {
                bcrypt.hash(New_Password, saltRounds, function(err, HashPassword) {
                    if (err) return res.status(500).send();
                    User_Information.findOneAndUpdate({
                        _id: req.session.user
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
    User_Information.findOneAndDelete({ _id: req.session.user }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (!existUser) return res.status(500).send();
        req.session.destroy(function(err) {
            if (err) return res.status(500).send();
        });
        res.redirect('/LoginUser')
    })
}
const DashboardAvatar = (req, res) => {
    console.log(req.body);
    let avatar = req.body.New_Avatar
    const upload = Avatar.uploadAvatar.single(`${avatar}`);
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log(111111111);
            res.status(500).send('Server Error!')
        } else if (err) {
            res.status(404).send(err.message)
        } else {
            User_Information.findByIdAndUpdate({ _id: req.session.user }, { $set: { User_Avatar: req.file.filename } }, (err, user) => {
                if (err) {
                    console.log(2222222222);
                    res.status(500).json({ msg: 'Server Error!' })
                } else {
                    if (user[0].User_Avatar) {
                        fs.unlink(path.join(__dirname, '../public/images/avatars', user[0].User_Avatar), err => {
                            if (err) {
                                console.log(3333333333);
                                res.status(500).json({ msg: 'Server Error!' })
                            } else {
                                req.session.user = user;

                                res.send("avatar is ok")
                            }
                        })

                    } else {
                        req.session.user = user;

                        res.send("avatar is ok")
                    }
                }
            });
        }
    })
}
module.exports = {
    DashboardDelete,
    DashboardChangPassword,
    DashboardEdit,
    DashboardLogOut,
    DashboardPage,
    DashboardAvatar
}
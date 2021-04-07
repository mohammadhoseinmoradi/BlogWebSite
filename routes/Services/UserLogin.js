const express = require('express')
const bcrypt = require('bcrypt')
const User_Information = require('../../Models/User')
const Error_handling = require('../../tools/ErrorHandling/ErrorHandling')
const LoginPage = (req, res) => {
    res.render('LoginPage')
}

const User_Login = (req, res) => {


    let User_Name = req.body.User_Name;
    let User_Password = req.body.User_Password;


    User_Information.find({
        User_Name: User_Name
    }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (existUser.length == 0) {
            return res.status(500).send();
        }

        let a = User_Password;
        bcrypt.compare(a, existUser[0].User_Password, (err, result) => {
            if (err) return res.status(500).send();

            if (result == true) {
                existUser[0].User_Password = User_Password;

                req.session.user = {
                    User_id: existUser[0]._id,
                    User_Avatar: existUser[0].User_Avatar
                }


                res.send("User Found :)")
            } else if (result == false) {
                return res.status(500).send();
            }
        })
    })
}

module.exports = {
    LoginPage,
    User_Login
}
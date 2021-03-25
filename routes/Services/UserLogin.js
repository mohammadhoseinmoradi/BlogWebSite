const express = require('express')
const bcrypt = require('bcrypt')
const User_Information = require('../../Models/User')
const Error_handling = require('../../tools/ErrorHandling/ErrorHandling')
const LoginPage = (req, res) => {
    res.render('LoginPage')
}

const User_Login = (req, res) => {
    console.log(3452345235);
    console.log(req.body);
    let User_Name = req.body.User_Name;
    let User_Password = req.body.User_Password;
    console.log(5345353);
    console.log(User_Name, User_Password);
    User_Information.find({ User_Name: User_Name }, (err, existUser) => {
        if (err) return res.status(500).send();
        if (existUser.length == 0) { return res.status(500).send(); }
        console.log(existUser);
        let a = User_Password;
        bcrypt.compare(a, existUser[0].User_Password, (err, result) => {
            if (err) return res.status(500).send();
            console.log(result);
            if (result == true) {
                existUser[0].User_Password = User_Password;
                console.log(existUser);
                req.session.user = existUser[0]._id
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
const express = require('express')
const User_Information = require('../../Models/User')
const bcrypt = require('bcrypt')
const Error_handling = require('../../tools/ErrorHandling/ErrorHandling')
const saltRounds = 10;

const DashboardPage = (req, res) => {
    console.log("hhfhhggggggggggggggggggggggggggggggggggggggggggggggg");
    console.log(req.session.user);
    User_Information.find({ _id: req.session.user }, (err, existUser) => {
        console.log(existUser);
        if (err) return res.status(500).send('Server Error :(')
        if (existUser.length == 0) { return res.status(500).send('Server Error :(') }
        res.render('Dashboard')
    })
}
const DashboardEdit = (req, res) => {
    User_Information.findOneAndUpdate({
        _id: req.session.user
    }, {
        $set: {


            User_Name: req.body.User_Name,
            User_First_Name: req.body.First_Name,
            User_Last_Name: req.body.Last_Name,
            User_Gender: req.body.Gender,
            User_Email: req.body.Email,
            User_Birthday: req.body.Birthday,
            User_Number: req.body.number,
        }
    }, (err, existUser) => {
        if (err) { Error_handling(500, "Server Error") }
        if (!existUser) { Error_handling(404, "Not Found User") }
        res.send("User Has Edited")
    })
}

const DashboardChangPassword = (req, res) => {
    New_Password = req.body.New_Password
    Old_Password = req.body.Old_Password
    User_Information.find({ _id: req.session.user }, (err, existUser) => {
        if (err) { Error_handling(500, "Server Error") }
        if (User.length == 0) { Error_handling(404, "Not Found User") }
        bcrypt.compare(Old_Password, existUser[0].User_Password, function(err, result) {

            if (err) { Error_handling(500, "Server Error") }
            if (result == true) {
                bcrypt.hash(New_Password, saltRounds, function(err, HashPassword) {
                    if (err) { Error_handling(500, "Server Error") }
                    User_information.findOneAndUpdate({
                        _id: req.session.user
                    }, {
                        $set: {
                            User_Password: HashPassword,
                        }
                    }, (err, UpdateUser) => {
                        if (err) { Error_handling(500, "Server Error") }

                        req.session.destroy(function(err) {
                            if (err) { Error_handling(500, "Server Error") }
                        });

                        res.send('User Password is Changed')

                    });
                });
            } else {
                Error_handling(500, "Server Error")
            }
        });
    })



}
const DashboardLogOut = (req, res) => {
    req.session.destroy(function(err) {
        if (err) { Error_handling(500, "Server Error") }

    });
    res.redirect('/Login/LoginPage')
}
const DashboardDelete = (req, res) => {
    User_information.findOneAndDelete({ _id: req.session.user }, (err, existUser) => {
        if (err) { Error_handling(500, "Server Error") }
        if (!info) { Error_handling(404, "Not Found User") }
        req.session.destroy(function(err) {
            if (err) { Error_handling(500, "Server Error") }
        });
        res.redirect('/Login/LoginPage')
    })
}
module.exports = {
    DashboardDelete,
    DashboardChangPassword,
    DashboardEdit,
    DashboardLogOut,
    DashboardPage
}
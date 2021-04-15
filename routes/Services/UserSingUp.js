const express = require('express')
const bcrypt = require('bcrypt')
const User_Information = require('../../Models/User')
const session = require('express-session')

const saltRounds = 10;
const Fields_Pattern = [
    "User_Name",
    "User_First_Name",
    "User_Last_Name",
    "User_Password",
    "User_Gender",
    "User_Email",
    "User_Number"
];


const SingUpPage = (req, res) => {
    res.render('SingUpPage')
}


const User_Register = (req, res) => {
    let a = Object.keys(req.body);
    let Body_Keys = Object.keys(req.body)
    const Check_Fields_Result = Fields_Pattern.every((field) => Body_Keys.includes(field))
    if (!Check_Fields_Result || Body_Keys.length !== 7) {
        return res.status(500).send();
    }
    User_Information.find({
        User_Name: req.body.User_Name.trim()
    }, (err, existUser) => {

        if (err) {
            if (err) return res.status(500).send();

        }
        if (existUser.length != 0) {
            return res.status(500).send();

        }
        bcrypt.hash(req.body.User_Password, saltRounds, (err, HashPassword) => {
            if (err) {
                if (err) return res.status(500).send();

            }
            const New_User = new User_Information({
                User_Name: req.body.User_Name,
                User_First_Name: req.body.User_First_Name,
                User_Last_Name: req.body.User_Last_Name,
                User_Password: HashPassword,
                User_Gender: req.body.User_Gender,
                User_Email: req.body.User_Email,
                User_Number: req.body.User_Number
            })
            New_User.save({}, (err, UserSaved) => {
                if (err) return res.status(500).send();

                req.session.user = {
                    User_id: UserSaved._id,
                    User_Avatar: UserSaved.User_Avatar
                }

                res.send("User Has Been Created :)")
            })
        })
    })
}


module.exports = {
    SingUpPage,
    User_Register
}
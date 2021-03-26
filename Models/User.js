const mongoose = require('mongoose');
const { Schema } = mongoose;


const essentialSchema = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
}

const UserSchema = new Schema({
    User_Name: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    User_First_Name: {
        ...essentialSchema,

    },
    User_Last_Name: {
        ...essentialSchema,

    },
    User_Password: {
        type: String,
        required: true,
        trim: true,

    },
    User_Gender: {
        ...essentialSchema,
        enum: ["female", "male", "other"],
        required: true
    },
    User_Number: {
        type: String,
        required: true,
        trim: true,

    },
    User_Email: {
        type: String,
        required: true,
        trim: true,

    },
    User_Role: {
        type: String,
        enum: ['blogger', 'admin'],
        default: 'blogger'
    },
    User_CreatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    User_Avatar: {
        type: String,
        default: 'https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg'
    }
});
module.exports = mongoose.model("User", UserSchema)
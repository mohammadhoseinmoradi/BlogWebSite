const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    Article_Title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    Article_Summary: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 1000,
    },
    Article_File_Location: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 1000,
        default: "default.html"
    },
    Article_Avatar: {
        type: String,
        default: 'Default.png'
    },
    Article_Photos: {
        type: Array,
        default: 'Default.png'
    },
    Article_CreatedAt: {
        type: Date,
        default: Date.now
    },
    Article_LastUpdate: {
        type: Date,
        default: Date.now
    },
    Article_Owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});



module.exports = mongoose.model('Article', ArticleSchema);
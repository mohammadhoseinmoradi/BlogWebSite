const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    Comment_Text: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 1000,
    },
    Comment_CreatedAt: {
        type: Date,
        default: Date.now
    },

    Comment_Owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Comment_Article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }
});



module.exports = mongoose.model('Comment', CommentSchema);
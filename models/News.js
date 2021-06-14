const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    newsTitle: {
        type: String,
        required: [true, "Please Include Title"]
    },
    newsBody: {
        type: String,
        required: [true, "Please Include body"]
    },
    newsClass: {
        type: String,
        required: true
    },
    viewCounter: Number,
    author: String,
    image: {
        type: String
    },
    comments: [{
        name: String,
        text: String,
        editing: Boolean,
        isReplyOn: Boolean,
        date: Date,
        replyText: String,
        replies: [{
            name: String,
            text: String,
            editing: Boolean,
            date: Date
        }]
    }]
}, {timestamps: true});


const News = mongoose.model('News', newsSchema);

module.exports = News;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    _id: Number,
    NewsTitle: String,
    NewsBody: String,
    NewsClass: String,
    ViewCounter: Number
}, {timestamps: true});

const newsClassSchema = new Schema({
    _id: Number,
    NewsClass: String,
}, {timestamps: true});

const News = mongoose.model('News', newsSchema);

const NewsClasses = mongoose.model('newsClasses', newsClassSchema)

module.exports = {
    News,
    NewsClasses
};
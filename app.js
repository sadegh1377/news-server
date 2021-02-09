const express = require('express');
const mongoose = require('mongoose');
const {News, NewsClasses} = require("./models/news")

const app = express();

const dbURI = "mongodb+srv://sadegh:Sadegh@77@news.ofrrl.mongodb.net/NewsData?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000);
    }).catch((err) => {
    console.log(err)
})

//
// app.get('/add-news', (req, res) => {
//     const news = new News({
//         _id: 2,
//         NewsTitle: "Microsoft" +
//             "unveils new" +
//             " Xbox",
//         NewsBody: "Microsoft hasn’t disclosed a" +
//             "price for the new device, an" +
//             "important detail gamers will no" +
//             "doubt be looking for as they" +
//             "come to decide which new" +
//             " model to get their hands on.",
//         NewsClass: "Technology",
//         ViewCounter: 100
//     });
//     news.save().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// });
//
// app.get('/add-newsClass', (req, res) => {
//     const news = new NewsClasses({
//         _id: 5,
//         NewsClass: "Sports",
//     });
//     news.save().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// });

app.get('/all-news', (req, res) => {
    News.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/all-news-classes', (req, res) => {
    NewsClasses.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/single-news', (req, res) => {
    News.findById("601fece6156faf30fa5be9f0").then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})
const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({database_error: err});
    });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
// define first route
app.get("/", (req, res) => {
    console.log("Hello MEVN Soldier");
});
const userRoutes = require("./route/user"); //bring in our user routes
app.use("/user", userRoutes);
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

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
//
// app.get('/all-news', (req, res) => {
//     News.find().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// });
//
// app.get('/all-news-classes', (req, res) => {
//     NewsClasses.find().then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// })
//
// app.get('/single-news', (req, res) => {
//     News.findById("601fece6156faf30fa5be9f0").then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// })
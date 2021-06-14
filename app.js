const express = require("express");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cors = require('cors');
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

const newRoutes = require("./route/news") //bring in our news routes
app.use("/news", newRoutes)
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});


// app.get('/single-news', (req, res) => {
//     News.findById("601fece6156faf30fa5be9f0").then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//     })
// })
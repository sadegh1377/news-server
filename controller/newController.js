const News = require("../models/News");

exports.addNews = (req, res) => {
    const news = new News({
        newsTitle: req.body.newsTitle,
        newsBody: req.body.newsBody,
        newsClass: req.body.newsClass,
        viewCounter: req.body.viewCounter,
        author: req.body.author
    })
    News.findOne({newsTitle: news.newsTitle}).then((newsTitle) => {
        if (newsTitle) {
            res.status(409).json({
                message: "This news already exist"
            });
        } else {
            news.save().then((data) => {
                res.status(201).send({message: "News saved successfully"})
            }).catch((err) => {
                res.status(400).json({err: err.message})
            })
        }
    })
}

exports.favNews = async (req, res) => {
    const result = []
    const favClasses = req.query.favClasses
    // console.log(favClasses)
    if (favClasses) {
        for (const fav of favClasses) {
            result.push(await News.find({newsClass: fav}))
        }
    }
    // console.log(result)
    res.send(result)
}

exports.increaseViewCounter = (req, res) => {
    const id = req.body._id;
    console.log(id)
    News.findByIdAndUpdate({_id: id}, {$inc: {viewCounter: 1}},
        {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.send(doc)
            }
        })
}

exports.fullNews = (req, res) => {
    const id = req.query.id
    News.findById(id).then((result) => {
        res.send(result);
    })
}

exports.allNews = (req, res) => {
    News.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

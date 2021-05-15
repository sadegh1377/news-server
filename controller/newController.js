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
            res.status(409).send({
                message: "در حال حاضر خبری با این عنوان وجود دارد"
            });
        } else {
            news.save().then((data) => {
                res.status(201).send({message: "خبر با موفقیت ذخیره شد"})
            }).catch((err) => {
                res.status(400).send({message: "خبر ذخیره نشد"})
            })
        }
    })
}
exports.deleteNews = (req, res) => {
    const id = req.body._id;

    News.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.status(400).json({
                message: "عملیات حذف کردن با مشکل مواجه شد"
            })
        } else {
            res.status(200).json({
                doc: doc,
                message: "خبر با موفقیت حذف شد"
            })
        }
    }).catch((err) => {
        console.log(err)
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

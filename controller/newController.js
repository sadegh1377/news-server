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
    News.findByIdAndUpdate({_id: id}, {$inc: {viewCounter: 1}},
        {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.send(doc)
            }
        })
}

exports.addComment = (req, res) => {
    const id = req.body._id;
    const comments = req.body.comments
    News.findByIdAndUpdate({_id: id}, {$set: {comments: comments}}, {new: true},
        (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                res.send(doc)
            }
        })
}
exports.deleteComment = (req, res) => {
    let id = req.body._id
    const text = req.body.text;
    News.findById({_id: id}, (err, doc) => {
        doc.comments.forEach((comment) => {
            if (comment.text === text) {
                let index = doc.comments.indexOf(text);
                doc.comments.splice(index)
                doc.save()
                res.send(doc.comment)
            }
        })
    }).catch(err => {
        console.log(err)
    })

}
exports.addReplies = (req, res) => {
    let id = req.body._id
    const text = req.body.text;
    const replies = req.body.replies
    News.findById({_id: id},
        (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                doc.comments.forEach((comment) => {
                    // console.log(comment.text)
                    // console.log(typeof text)
                    if (comment.text === text) {
                        comment.replies = replies
                        console.log(comment.replies)
                    }
                })
                doc.save()
                res.send(doc)
                // console.log(doc)
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

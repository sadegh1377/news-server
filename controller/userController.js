const User = require("../models/User.js");

exports.registerNewUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        favClasses: req.body.favClasses
    })

    User.findOne({email: user.email}).then((email) => {
        if (email) {
            res.status(409).json({
                message: "Email already in use"
            });
        } else {
            user.save().then((data) => {
                user.generateAuthToken().then((token) => {
                    res.status(201).json({data, token})
                })
            }).catch((err) => {
                res.status(400).json({err: err.message})
            })
        }
    })
}

exports.loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByCredentials(email, password).then((user) => {
            user.generateAuthToken().then((token) => {
                res.status(201).json({
                    user, token
                })
            })
        }
    ).catch((err) => {
        res.status(401).json({
            message: "Email or Password is incorrect"
        })
    })
}
exports.addToFavClass = (req, res) => {
    const email = req.body.email;
    const favClasses = req.body.favClasses;
    User.findOneAndUpdate({email: email}, {$set: {favClasses: favClasses}},
        {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                doc.generateAuthToken().then((token) => {
                    res.status(201).json({
                        token
                    })
                })
            }
        })
}

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
}
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.registerNewUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        favClasses: req.body.favClasses,
        isAdmin: false
    })

    User.findOne({email: user.email}).then((email) => {
        if (email) {
            res.status(409).json({
                message: "ایمیل انتخابی در اختیار کاربر دیگری است"
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
    }).catch((err) => {
        res.status(401).json({
            message: "ایمیل یا رمزعبور اشتباه است"
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
                console.log(doc)
                doc.generateAuthToken().then((token) => {
                    res.status(201).json({
                        token
                    })
                })
            }
        })
}

exports.changeProfile = async (req, res) => {
    const newName = req.body.newName;
    const newEmail = req.body.newEmail;
    const oldEmail = req.body.oldEmail;
    let password = req.body.password
    password = await bcrypt.hash(password, 8);

    User.findOne({email: newEmail})
        .then((email) => {
            if (email) {
                res.status(409).json({
                    message: "ایمیل انتخابی در اختیار کابر دیگری است"
                });
            } else {
                User.findOneAndUpdate({email: oldEmail}, {
                    $set: {
                        name: newName,
                        email: newEmail,
                        password: password
                    }
                }, {new: true}, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    } else {
                        console.log(doc)
                        doc.generateAuthToken().then((token) => {
                            res.status(201).json({
                                token
                            })
                        })
                    }
                })
            }
        })
}

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
}

// exports.getSadegh = async (req, res) => {
//     await res.json({name: "Sadegh", lastName: "Hadipour"});
// }
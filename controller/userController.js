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


// exports.registerNewUser = async (req, res) => {
//     try {
//         // console.log(User);
//         // if (User.length >= 1) {
//         //     return res.status(409).json({
//         //         message: "email already in use"
//         //     });
//         // }
//         const user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             favClasses: req.body.favClasses
//         });
//         let data = await user.save();
//         const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
//         res.status(201).json({data, token});
//     } catch (err) {
//         res.status(400).json({err: err.message});
//     }
// };
exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({error: "Login failed! Check authentication credentials"});
        }
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (err) {
        res.status(400).json({err: err});
    }
};
exports.addToFavClass = async (req, res) => {
    // try {
    //     const id = req.body.id;
    //     User.findById(id, (err, user) => {
    //         if (!user) {
    //             req.flush("error", "No account found");
    //             return res.redirect('/');
    //         }
    //         user.favClasses = req.body.favClasses;
    //         console.log(user)
    //         let data = user.save();
    //         res.send(user)
    //     })
    //
    // } catch (err) {
    //     res.status(400).json({err: err.message});
    // }
    const id = req.body.id;
    console.log(req.body)
    // let doc = await User.updateOne(id, {favClasses: req.body.favClasses})
    // const token = await .generateAuthToken();
    // await doc.save()

    // res.send(doc, token)
}

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
}
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    console.log(req)
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        req.userData = jwt.verify(token, "secret");
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
};

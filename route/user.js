const express = require('express');
const router = express.Router();
const auth = require("../config/auth")
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.put("/add-fav-class", userController.addToFavClass);
router.get("/me", auth, userController.getUserDetails);
router.put('/change-profile',userController.changeProfile)
// router.get("/sadegh", auth, userController.getSadegh);

module.exports = router;
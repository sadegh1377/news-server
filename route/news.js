const express = require('express');
const router = express.Router();
const auth = require("../config/auth")
const newsController = require("../controller/newController");

router.post("/add-news", auth, newsController.addNews);
router.get("/all-news", newsController.allNews);
router.get("/fav-news", newsController.favNews);
module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require("../config/auth")
const newsController = require("../controller/newController");

router.post("/add-news", newsController.addNews);
router.get("/all-news", newsController.allNews);
router.get("/fav-news", newsController.favNews);
router.get("/full-news", newsController.fullNews);
router.delete("/delete-news", newsController.deleteNews);
router.delete("/delete-comment", newsController.deleteComment);
router.delete("/delete-reply", newsController.deleteReply)
router.put("/inc-view", newsController.increaseViewCounter);
router.put("/add-comment", newsController.addComment);
router.put("/add-replies", newsController.addReplies);
router.put("/edit-news", newsController.editNews);

module.exports = router;
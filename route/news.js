const express = require('express');
const router = express.Router();
const auth = require("../config/auth")
const newsController = require("../controller/newController");
const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

router.post("/add-news", auth, upload.single('upload'), newsController.addNews);
router.get("/all-news", newsController.allNews);
router.get("/fav-news", newsController.favNews);
router.get("/full-news", newsController.fullNews);
router.delete("/delete-news", newsController.deleteNews);
router.delete("/delete-comment", newsController.deleteComment);
router.delete("/delete-reply", newsController.deleteReply)
router.put("/inc-view", newsController.increaseViewCounter);
router.put("/add-comment", newsController.addComment);
router.put("/add-replies", newsController.addReplies);
// router.post("/image", upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })
module.exports = router;
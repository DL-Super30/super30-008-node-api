const express = require("express");
const upload = require("../middlewear/uploads.mdw");
const courseDetail = require("../controllers/course.ctrl");
const router = express.Router();

router.post("/", upload.single("courseBrochure"), courseDetail.createCourse);
router.get("/", courseDetail.getAllCourse);

module.exports = router;

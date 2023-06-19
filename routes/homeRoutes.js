const path = require("path");

const express = require("express");

const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);

module.exports = router;

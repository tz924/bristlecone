const path = require("path");

const express = require("express");

const mapController = require("../controllers/mapController");

const router = express.Router();

router.get("/", mapController.getIndex);
module.exports = router;

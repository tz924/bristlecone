const path = require("path");

const express = require("express");

const mapController = require("../controllers/mapController");

const router = express.Router();

router.get("/", mapController.getIndex);

// Bryce Canyon
router.get("/brca", mapController.getBRCA);

// Great Basin
router.get("/grba", mapController.getGRBA);

module.exports = router;

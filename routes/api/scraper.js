// **** DEPENDENCIES ****
var router = require("express").Router();
var scraperController = require("../../controllers/scraper");

router.get("/", scraperController.scrapeArticles);

module.exports = router;

// Routes for the views (home page, saved articles)

// **** DEPENDENCIES ****
var router = require("express").Router();

// Home
router.get("/", function(req, res) {
  res.render("home");
});

// Saved Articles
router.get("/saved", function(req, res) {
  res.render("saved");
});

module.exports = router;

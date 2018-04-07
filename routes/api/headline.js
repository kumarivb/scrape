// **** DEPENDENCIES ****
var router = require("express").Router();
var articleController = require("../../controllers/headline");

// Find All Articles (/api/articles)
router.get("/", articleController.findAll);
// Delete one article (/api/articles/:id)
router.delete("/:id", articleController.delete);
// Update one article (/api/articles/:id)
router.put("/:id", articleController.update);

module.exports = router;

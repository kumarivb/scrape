// **** DEPENDENCIES ****
var router = require("express").Router();
var noteController = require("../../controllers/note");

// Find one note
router.get("/:id", noteController.findOne);
// Create a new note
router.post("/", noteController.create);
// Delete one note
router.delete("/:id", noteController.delete);

module.exports = router;

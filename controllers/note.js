var db = require("../models");

module.exports = {
  // Find one Note
  findOne: function(req, res) {
    db.Note.findOne(req.query).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  // Create a new Note
  create: function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  // Delete a specific Note
  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(function(dbNote) {
      res.json(dbNote);
    });
  }
};

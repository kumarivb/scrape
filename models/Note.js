var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// making the Note Schema
var noteSchema = new Schema({
  // The article associated with the note
  _articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  date: {
    type: Date,
    default: Date.now
  },
  noteText: String
});

// creates the model using the above schema
var Note = mongoose.model("Note", noteSchema);

module.exports = Note;

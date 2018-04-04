// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");
var request = require("request");

// Initialize Express
var app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/feed", {
    useMongoClient: true
});
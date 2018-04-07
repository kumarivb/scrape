// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");

// Initialize Express
var app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use morgan logger for logging requests
app.use(logger("dev"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/feed";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// ROUTES
// var routes = require("./routes");
// app.use(routes);

var PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
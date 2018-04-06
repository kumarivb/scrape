// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");
var request = require("request");

// Require all models
var db = require("./models");

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
    // useMongoClient: true
});

// ROUTES
// get
app.get("/scrape", function(req, res) {
    // Make a request to grab HTML body from site
    request("https://www.boredpanda.com/", function(err, response, html) {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
        var results = [];

        // select elements
        $("article h2").each(function(i, element) {

            // add text href and summary
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.desc = $(this)
                .children("description")
                .text();
        });
    });
    console.log(results);
});

var PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
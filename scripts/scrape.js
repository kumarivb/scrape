// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");
var logger = require("morgan");

// scrape
var scrape = function() {
    // get route, grab the body of the html with request
    return axios.get("https://www.boredpanda.com").then(function(res) {
        var $ = cheerio.load("res.data");

        // results array
        var articles = [];

        // get every info from certain tags
        $("article.post").each(function(i, element) {
            var title = $(this)
                .children("h2")
                .children("a").text();
            var link = $(this)
                .children("h2")
                .children("a").attr("href");
            var summary = $(this)
                .children(".intro")
                .children("p.description").text();

            var articleInfo = {
                title: title,
                link: link,
                summary: summary
            };

            articles.push(articleInfo);
        });

        return articles;
    });
};

module.exports = scrape;
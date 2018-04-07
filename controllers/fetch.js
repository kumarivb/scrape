var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    fetch: function(req, res) {
        return scrape().then(function(articles) {
        return db.Article.create(articles);
        })
        .then(function(dbArticle) {
            if (dbArticle.length === 0) {
                res.json({ message: "There isn't anything new. Try again later." });
            } else {
                res.json({ message: "Added " + dbArticle.length + " new articles." });
            }
        })
        .catch(function(err) {
            res.json({ message: "Getting articles complete!" });
        });
    }
};
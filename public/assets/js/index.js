// load the document
$(document).ready(function() {
  // variable for the articleContainer that will hold all Articles
  var articleContainer = $(".article-container");

  // Button events for scraping new articles and saving articles
  $(document).on("click", ".save-article", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // Once page is ready, run initPage function
  initPage();

  // FUNCTIONS
  function initPage() {
    // Empty the container so articles have blank canvas
    articleContainer.empty();
    $.get("/api/articles?saved=false").then(function(data) {
      // If articles exist, render them to the page
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        renderEmpty();
      }
    });
  } // END initPage function

  function renderArticles(articles) {
    // appends HTML containing the article data to the page
    var articleCards = [];

    for (var i = 0; i < articles.length; i++) {
      articleCards.push(createCard(articles[i]));
    }
    articleContainer.append(articleCards);
  } // END renderArticles FUNCTIONS

  function createCard(article) {
    var card = $(
      [
        "<div class='col s12 m6'>",
        "<div class='card'>",
        "<div class='card-image'>",
        "<img src='" + article.image + "'>",
        "<a href='" + article.link + "'>",
        "<span class='card-title'>" + article.title + "</span></a>",
        "<a class='btn-floating halfway-fab waves-effect waves-light red save-article'>",
        "<i class='material-icons'>add</i></a>",
        "</div>",
        "<div class='card-content'>",
        "<p>" + article.summary + "</p>",
        "</div></div></div>"
      ].join("")
    );
    // attach the article's id to the jQuery element
    // we'll need this for tracking which article the user saves
    card.data("_id", article._id);
    return card;
  } // END createCard function

  function renderEmpty() {
    // render this in the case of no Articles
    var emptyAlert = $(
      [
        "<div class='col s12'>",
        "<h3>Well, darn! We don't have any new articles.</h4>",
        "<h4><a href='/saved'>See Saved Articles!</a></h4>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);
  } // END renderEmpty function

  function handleArticleSave() {
    // Saves articles (changes saved to true) on click of the add Button
    var articleToSave = $(this).parents(".card").data();
    articleToSave.saved = true;
    // use ajax method to update the existing record
    $.ajax({
      method: "PUT",
      url: "/api/articles/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again. This will reload the entire list of articles
        initPage();
      }
    });
  } // END handleArticleSave function

  function handleArticleScrape() {
    // Scrapes WaPo Tech for new articles upon click of the Button
    $.get("/api/scraper").then(function(data) {
      initPage();

    });
  } // End handleArticleScrape
}); // END OF SCRIPT

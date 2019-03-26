var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", res);
  });

  //Load Client Page to show Developers
  app.get("/client", function(req, res) {
    res.render("client", {
      developers: res
    });
  });

  //Load Developer Page to show Clients
  app.get("/developer", function(req, res) {
    res.render("index", {
      clients: res
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

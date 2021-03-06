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

  app.get("/clientJobPost", function(req, res) {
    res.render("clientJobPost", res)
  });

  //Load Developer Page to show Clients
  app.get("/developer", function(req, res) {
    res.render("developer", {
      clients: res
    });
  });

  app.get("/developerApp", function(req, res) {
    res.render("developerApp", {
      clients: res
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

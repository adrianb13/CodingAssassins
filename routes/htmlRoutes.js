var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index");
  });

  //Load Client Page to show Assassins
  app.get("/client", function(req, res) {
    db.Assassin.findAll({}).then(function(dbAssassin) {
      res.render("assassin", {
        assassin: dbAssassin
      });
    });
  });

  app.get("/assassin", function(req, res) {
    db.Assassin.findOne({
      where: {
        password: req.body.password
      }
    }).then(function(dbAssassin) {
      res.render("assassin")
    });      
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

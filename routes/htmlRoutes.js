var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index");
  });

  //Load Client Page to show Developers
  app.get("/client", function(req, res) {
    db.Developers.findAll({}).then(function(dbDeveloper) {
      res.render("developer", {
        developers: dbDeveloper
      });
    });
  });

  //Load Developer Page to show Clients
  app.get("/developer", function(req, res) {
    db.Client.findAll({}).then(function(dbClients) {
      res.render("client", {
        clients: dbClients
      });
    });
  });

  app.get("/developer", function(req, res) {
    db.Developer.findOne({
      where: {
        password: req.body.password
      }
    }).then(function(dbDeveloper) {
      res.render("developer")
    });      
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

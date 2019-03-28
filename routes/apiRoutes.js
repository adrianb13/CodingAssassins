var db = require("../models");

module.exports = function(app) {

// Developers List
  app.get("/api/developers", function(req, res) {
    db.Developers.findAll({}).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    });
  });

// View Developers Description
  app.get("/api/developers/id/:id", function(req, res) {
    db.Developers.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    }).catch(function(err) {
      res.json(err);
    });
  });

  // Developer Sign In
  app.get("/api/developers/password/:password", function(req, res) {
    db.Developers.findOne({
      where: {
        password: req.params.password
      }
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    }).catch(function(err) {
      res.json(err);
    });
  });

  app.get("/api/developers/:name", function(req, res) {
    db.Developers.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    }).catch(function(err) {
      res.json(err);
    });
  });

// Clients list for Developers
app.get("/api/clients", function(req, res) {
  db.Clients.findAll({
  }).then(function(dbClients) {
/*     var clients = {
      clients: dbClients
    };
    console.log(clients);
    res.render("client", clients); */
    res.json(dbClients)
  });
});

// Find A Certain Client And All Jobs
  app.get("/api/clients", function(req, res) {
    db.Clients.findAll({
      where: {
        phone_number: req.body.phone_number
      }
    }).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  app.get("/api/clients/:name", function(req, res) {
    db.Clients.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbClients) {
      res.json(dbClients);
    }).catch(function(err) {
      res.json(err);
    });
  });

// Developers Application
  app.post("/api/developers", function(req, res) {
    db.Developers.create({
      name: req.body.name,
      experience: req.body.experience,
      cost_to_hire: req.body.cost_to_hire,
      password: req.body.password
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    }).catch(function(err) {
      res.json(err);
    });
  });

// Create a new Client Job Post
  app.post("/api/clients", function(req, res) {
    db.Clients.create({
      name: req.body.name,
      phone_number: req.body.phone_number,
      job_header: req.body.job_header,
      job_requested: req.body.job_requested
    }).then(function(dbClients) {
      res.json(dbClients);
    }).catch(function(err) {
      res.json(err);
    });
  });

// Hire Developers
  app.put("/api/developers/:id", function(req, res) {
    db.Developers.update({
      hired: req.body.hired,
      hired_by: req.body.hired_by
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers)
    }).catch(function(err) {
      res.json(err);
    });
  });

// Confirm Completion Of Requested Job By Clients
  app.put("/api/clients/:id", function(req, res) {
    db.Clients.update({
      job_completed: req.body.job_completed
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbClients) {
      res.json(dbClients);
    }).catch(function(err) {
      res.json(err);
    });
  });

  // Delete developer
  app.delete("/api/developers/:id", function(req, res) {
    db.Developers.destroy({
      where: {
        id: req.params.id }
    }).then(function(dbDevelopers) {
      res.json(dbDevelopers);
    });
  });

  // Delete A Job Request
  app.delete("/api/clients/:id", function(req, res) {
    db.Clients.destroy({
      where: {
        id: req.params.id }
    }).then(function(dbClients) {
      res.json(dbClients);
    });
  });
};

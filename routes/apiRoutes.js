var db = require("../models");

module.exports = function(app) {

// Client Page
// Assassin List
  app.get("/api/assassin", function(req, res) {
    db.Assassin.findAll({}).then(function(dbAssassin) {
      res.json(dbAssassin);
    });
  });

// View Assassin Description
  app.get("/api/assassin/:id", function(req, res) {
    db.Assassin.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbAssassin) {
      res.json(dbAssassin);
    }).catch(function(err) {
      res.json(err);
    });
  });

// Get Own Job Request
  app.get("/api/client/:username", function(req, res) {
    db.Client.findOne({
      where: {
        username: req.body.name
      }
    })
  })

// Hire Assassin
app.put("/api/assassin/:id", function(req, res) {
  db.Assassin.update({
    hired: req.body.hired,
    hired_by: req.body.username
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(dbAssassin) {
    res.json(dbAssassin)
  }).catch(function(err) {
    res.json(err);
  });
});

// Delete A Job Request
app.delete("/api/client/:id", function(req, res) {
  db.Client.destroy({ 
    where: { 
      id: req.params.id } 
  }).then(function(dbClient) {
    res.json(dbClient);
  });
});

// Assassin Page
// Client list for Assassin
  app.get("/api/client/:id", function(req, res) {
    db.Client.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbClient) {
        res.json(dbClient);
    });  
  });
  
// Assassin Application
  app.post("/api/assassin", function(req, res) {
    db.Assassin.create({
      name: req.body.name,
      biography: req.body.biography,
      kill_history: req.body.kill_history,
      cost_to_hire: req.body.cost_to_hire
    }).then(function(dbAssassin) {
      res.json(dbAssassin);
    }).catch(function(err) {
      res.json(err);
    });
  });

  app.get("/api/assassin/:password", function(req, res) {
    db.Assassin.findOne({
      where: req.body.password
    })
  })

// Confirm Completion Of Requested Job By Client
  app.put("/api/client/:id", function(req, res) {
    db.Client.update({
      job_completed: req.body.job_completed
    }, {
      where: {
        id: req.body.id
      }
    });
  });
};


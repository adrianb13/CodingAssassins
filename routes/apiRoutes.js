var db = require("../models");

module.exports = function(app) {

// Client Page
// Developer List
  app.get("/api/developer", function(req, res) {
    db.Developer.findAll({}).then(function(dbDeveloper) {
      res.json(dbDeveloper);
    });
  });

// View Developer Description
  app.get("/api/developer/:id", function(req, res) {
    db.Developer.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbDeveloper) {
      res.json(dbDeveloper);
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

// Hire Developer
app.put("/api/developer/:id", function(req, res) {
  db.Developer.update({
    hired: req.body.hired,
    hired_by: req.body.username
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(dbDeveloper) {
    res.json(dbDeveloper)
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

// Developer Page
// Client list for Developer
  app.get("/api/client/:id", function(req, res) {
    db.Client.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbClient) {
        res.json(dbClient);
    });  
  });
  
// Developer Application
  app.post("/api/developer", function(req, res) {
    db.Developer.create({
      name: req.body.name,
      biography: req.body.biography,
      kill_history: req.body.kill_history,
      cost_to_hire: req.body.cost_to_hire
    }).then(function(dbDeveloper) {
      res.json(dbDeveloper);
    }).catch(function(err) {
      res.json(err);
    });
  });

  app.get("/api/developer/:password", function(req, res) {
    db.Developer.findOne({
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

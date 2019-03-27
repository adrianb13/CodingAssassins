// Get references to Developer Application Page elements
var $developerName= $("#developerName");
var $experience = $("#experience");
var $cost = $("#cost");
var $password = $("#password")
var $submit = $("#submit");
var $developerList = $("#developer-list");
var $developerHired = $("#developerHired-list");
var $projects = $(".projects");
var $currClient = $("#current-client");

// The API object contains methods for each kind of request we'll make
var API = {
  //Developers
  saveDeveloper: function(newDeveloper) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/developers",
      data: JSON.stringify(newDeveloper)
    });
  },
  getDeveloper: function() {
    return $.ajax({
      url: "api/developers",
      type: "GET"
    });
  },
  getOneDeveloper: function(id) {
    return $.ajax({
      url: "api/developers/" + id,
      type: "GET"
    });
  },
  hireDeveloper: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/developers/" + data.id,
      type: "PUT",
      data: JSON.stringify(data)
    });
  },
  deleteDeveloper: function(id) {
    return $.ajax({
      url: "api/developers/" + id,
      type: "DELETE"
    });
  },
  /// Clients
  saveClient: function(newClient) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/clients",
      data: JSON.stringify(newClient)
    });
  },
  getClient: function() {
    return $.ajax({
      url: "api/clients",
      type: "GET"
    });
  },
  getOneClient: function(data) {
    return $.ajax({
      url: "api/clients/" + data.name,
      type: "GET"
    });
  },
  deleteClient: function(id) {
    return $.ajax({
      url: "api/clients/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshDevelopers = function() {
  API.getDeveloper().then(function(data) {
    var $Developers = data.map(function(newDeveloper) {
      if (newDeveloper.hired === false) {
      var $a = $("<a>").text(newDeveloper.name + "'s Experience is: " + newDeveloper.experience)

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": newDeveloper.id,
          "data-name": newDeveloper.name
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right hire")
        .attr("href", "/clientJobPost")
        .text("Hire: $" + newDeveloper.cost_to_hire)

      $li.append($button);

      return $li;
      }
    });

    var $DevelopersHired = data.map(function(developer){
      if(developer.hired === true) {
      var $a = $("<a>").text(developer.name + "'s Experience is: " + developer.experience)

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": developer.id,
          "data-name": developer.name
        })
        .append($a);

      return $li;
      }
    });

    $developerList.empty();
    $developerList.append($Developers);
    $developerHired.append($DevelopersHired);
  });
};
refreshDevelopers();

// handleFormSubmit is called whenever we submit a new Developer
// Save the new Developer to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newDeveloper = {
    name: $developerName.val().trim(), 
    experience: $experience.val().trim(), 
    cost_to_hire: $cost.val().trim(), 
    password: $password.val().trim() 
  };

  if (!(newDeveloper.name && newDeveloper.experience && newDeveloper.cost_to_hire && newDeveloper.password)) {
    alert("You must enter your name, experience, cost to hire, and password!");
    return;
  } else if (isNaN(newDeveloper.cost_to_hire || newDeveloper.password)) {
    alert("You must enter numbers for your cost to hire and 4-Digit PIN/Password.")
  }

  API.saveDeveloper(newDeveloper).then(function(result) {
    console.log(result.id);
    localStorage.setItem("currDev", JSON.stringify(result.id));
    refreshDevelopers();
//    window.location.href = "/developer";
  });

  $developerName.val("");
  $experience.val("");
  $cost.val("");
  $password.val("");
};
//var currDev = localStorage.getItem("currDev");
//  currDev = JSON.parse(currDev);
var currDev = 10;
var currProject = 0;
var handleViewProject = function() {
  API.getOneDeveloper(currDev).then(function(currClient) {
    var hiredBy = currClient.hired_by;
    console.log(hiredBy)
    var client = {
      name: hiredBy
    };
    API.getOneClient(client).then(function(project) {

      $("#single-project").attr({class: "list-group-item list-project-item", "data-id": project.id})      
      $("#list-project").text(project.name + "'s requested job is: " + project.job_header);
      $button = $("<button>")
        .addClass("btn btn-success float-right completed")
        .text("Completed");
      $("#single-project").append($button);
      $("#list-description").text(project.job_requested);
      console.log($("#single-project").attr("data-id"));
    });
  });
};
$projects.on("click", handleViewProject)

// handleDeleteBtnClick is called when an Developer's delete button is clicked
// Remove the Developer from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDeveloper(idToDelete).then(function() {
    refreshDevelopers();
  });
};

var idToHire = 0;
var nameToHire = "";
var handleHireBtnClick = function() {
  idToHire = $(this)
    .parent()
    .attr("data-id");
  nameToHire = $(this)
    .parent()
    .attr("data-name");
  console.log(idToHire + " : " + nameToHire);
  localStorage.setItem("idHire", JSON.stringify(idToHire));
  localStorage.setItem("nameHire", nameToHire);

  API.getOneDeveloper(idToHire).then(function(response) {
    console.log(response.name);
    window.location.href = "/clientJobPost";
  });
};

// Add event listeners to the submit and delete buttons
$submit.on("click", handleFormSubmit);
$developerList.on("click", ".delete", handleDeleteBtnClick);
$developerList.on("click", ".hire", handleHireBtnClick);

/////////////////////////////////////////////////
var $clientName = $("#clientName");
var $phoneNumber = $("#phoneNumber");
var $jobHeader = $("#jobHeader");
var $jobDescription = $("#jobDescription")
var $jobSubmit = $("#jobSubmit");
var $clientList = $("#client-list");

var refreshClients = function() {
  API.getClient().then(function(data) {
    var $Clients = data.map(function(newClient) {
      var $a = $("<a>").text(newClient.name + "'s requested job is: " + newClient.job_header);
//        .attr("href", "/Clients/" + newClient.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": newClient.id
        })
        .append($a);

/*       var $button = $("<button>")
        .addClass("btn btn-danger float-right")
        .text(newClient.phone_number);

      $li.append($button); */

      return $li;
    });

    $clientList.empty();
    $clientList.append($Clients);
  });
}; 
refreshClients();

// Save Job Request
var devId = localStorage.getItem("idHire");
  devId = JSON.parse(devId);
var devName = localStorage.getItem("nameHire");

$("#hired").text("You want to hire " + devName + ". Tell him what you would like to do below");

var handleFormSubmit2 = function(event) {
  event.preventDefault();

  var newClient = {
    name: $clientName.val().trim(), 
    phone_number: $phoneNumber.val().trim(), 
    job_header: $jobHeader.val().trim(), 
    job_requested: $jobDescription.val().trim() 
  };

console.log(newClient);

  if (!(newClient.name && newClient.phone_number && newClient.job_header && newClient.job_requested)) {
    alert("You must enter your name, phone number, job header and description!");
    return;
  }

  API.saveClient(newClient).then(function(response) {
    console.log("...>" + devId)
    console.log("...>" + response.name)
    var newProject = response.name
      newProject.attr({"data-id": response.id})
    var hired = {
      id: devId,
      hired: true,
      hired_by: newProject
    };

    API.hireDeveloper(hired).then(function(response) {
      console.log(response[0]);
      refreshClients();
      refreshDevelopers();
//      $("#hired").text(devName + " has been notified! Thank you for using our service!")
      alert(devName + " has been notified! Thank you for using our service!")
      idToHire = 0;
      nameToHire = " ";
      window.location.href = "/client";
    });
  });

  $clientName.val("");
  $phoneNumber.val("");
  $jobHeader.val("");
  $jobDescription.val("");
};

var handleDeleteBtnClick2 = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteClient(idToDelete).then(function() {
    refreshClients();
  });
};

$jobSubmit.on("click", handleFormSubmit2);
$clientList.on("click", ".delete", handleDeleteBtnClick2)
// Get references to Developer Application Page elements
var $developerName= $("#developerName");
var $experience = $("#experience");
var $cost = $("#cost");
var $password = $("#password")
var $submit = $("#submit");
var $developerList = $("#developer-list");

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
  getOneDeveloper: function() {
    return $.ajax({
      url: "api/developers/:id",
      type: "GET"
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
      type: "POST",
      url: "../api/clients",
      data: JSON.stringify(newClient)
    });
  },
  getClient: function() {
    return $.ajax({
      url: "api/clients",
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
/*     var rows = [];
    for (i = 0; i < data.length; i++) {
      rows.push(createDeveloper(data[i]));
    }
    $("<tbody>").append(rows);
  })
}; */
    var $Developers = data.map(function(newDeveloper) {
      var $a = $("<a>")
        .text(newDeveloper.name + "      " + newDeveloper.cost_to_hire)
        .attr("href", "/developers/" + newDeveloper.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": newDeveloper.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right hire")
        .text("Hire");
 
      $li.append($button);

      return $li;
    });

    $developerList.empty();
    $developerList.append($Developers);
  });
}; 
refreshDevelopers();

function createDeveloper(developer) {
  var newTr = $("<tr>");
    newTr.data("developers", developer);
    newTr.append("<td>" + developer.name + "</td>");
    newTr.append("<td>" + developer.experience + "</td>");
    newTr.append("<td>" + developer.cost_to_hire + "</td>");
    newTr.append("<td>" + developer.hired + "</td>");
  return newTr;
};

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

console.log(newDeveloper);

  if (!(newDeveloper.name && newDeveloper.experience && newDeveloper.cost_to_hire && newDeveloper.password)) {
    alert("You must enter your name, experience, cost to hire, and password!");
    return;
  } else if (isNaN(newDeveloper.cost_to_hire || newDeveloper.password)) {
    alert("You must enter numbers for your cost to hire and 4-Digit PIN/Password")
  }

  API.saveDeveloper(newDeveloper).then(function() {
    refreshDevelopers();
  });

  $developerName.val("");
  $experience.val("");
  $cost.val("");
  $password.val("");
};

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


var handleHireBtnClick = function() {
  var idToHire = $(this)
    .parent()
    .attr("data-id");

  API.hireDeveloper(idToHire).then(function() {
    refreshDevelopers();
  });
};


// Add event listeners to the submit and delete buttons
$submit.on("click", handleFormSubmit);
$developerList.on("click", ".delete", handleDeleteBtnClick);

/////////////////////////////////////////////////
var $clientName= $("#clientName");
var $phoneNumber = $("#phoneNumber");
var $jobHeader = $("#jobHeader");
var $jobDescription = $("#jobDescription")
var $jobSubmit = $("#jobSubmit");
var $clientList = $("#client-list");

var refreshClients = function() {
  API.getClient().then(function(data) {
    var $Clients = data.map(function(newClient) {
      var $a = $("<a>")
        .text(newClient.name + "      " + newClient.phone_number)
        .attr("href", "/Clients/" + newClient.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": newClient.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");
 
      $li.append($button);

      return $li;
    });

    $clientList.empty();
    $clientList.append($Clients);
  });
}; 
refreshClients();

// Save Job Request
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
  }/*  else if (isNaN(newClient.phone_number)) {
    alert("You must enter numbers for your phone number.")
  } */

  API.saveClient(newClient).then(function() {
    refreshClients();
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

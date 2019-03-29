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
      url: "api/developers/id/" + id,
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
  logDeveloper: function(name) {
    return $.ajax({
      url: "api/developers/" + name,
      type: "GET"
    });    
  },
  loginDeveloper: function(password) {
    return $.ajax({
      url: "api/developers/password/" + password,
      type: "GET"
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
  completeClient: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/clients/" + data.id,
      type: "PUT",
      data: JSON.stringify(data)
    });
  },
  deleteClient: function(id) {
    return $.ajax({
      url: "api/clients/" + id,
      type: "DELETE"
    });
  },
  getQuote: function() {
    return $.ajax({
      url: "api/quote",
      type: "GET"
    })
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
      if (developer.hired === true) {
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
    alert("Thank you for working with Coding Assassins!!!")
    window.location.href = "/developer";
  });

  $developerName.val("");
  $experience.val("");
  $cost.val("");
  $password.val("");
};

var currDev = localStorage.getItem("currDev");
  currDev = JSON.parse(currDev);
//var currDev = 10;
var currProject = 0;
// handleViewProject handles the button click for a Developer to view an existing project he is hired for.
var handleViewProject = function() {
  API.getOneDeveloper(currDev).then(function(currClient) {
    console.log(currClient);
    if (currClient.hired === false) {
      alert("Sorry, you have not been hired for a project yet.")
    }
    var hiredBy = currClient.hired_by;
    console.log(hiredBy)
    var client = {
      name: hiredBy
    };
    API.getOneClient(client).then(function(project) {

      $("#single-project").attr({class: "list-group-item list-project-item", "data-id": project.id})      
      $("#list-project").text(project.name + "'s contact info is: " + project.phone_number);
      $button = $("<button>")
        .addClass("btn btn-success float-right completed")
        .text("Completed");
      $("#single-project").append($button);
      $("#list-description").text(project.job_requested);

      currProject = $("#single-project").attr("data-id");
      console.log(currProject);
    });
  });
};

// handles when complete is clicked by the developer
var completedJob = function() {
  var notHired = {
    id: currDev,
    hired: false,
    hired_by: null
  }
  API.hireDeveloper(notHired).then(function(response) {
    console.log("hired?: " + response[0]);
    refreshClients();
//    alert("Thank you for finishing your hired project!!! You are back on the list to accept another project!")
    var completed = {
      id: currProject,
      job_completed: true
    }
    API.completeClient(completed).then(function(response) {
      console.log(response);
      window.location.href = "/developer";
    });
  });
}

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
// handleHireBtnClick is called when a Client hires a specific developer.
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
    console.log(response);
    window.location.href = "/clientJobPost";
  });
};

// Add event listeners to the submit and delete buttons
$submit.on("click", handleFormSubmit);
$developerList.on("click", ".delete", handleDeleteBtnClick);
$developerList.on("click", ".hire", handleHireBtnClick);
$projects.on("click", handleViewProject);
$currClient.on("click", ".completed", completedJob);

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
      if (newClient.job_completed === false) {
        var $a = $("<a>").text(newClient.name + "'s requested job is: " + newClient.job_header);
//          .attr("href", "/Clients/" + newClient.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": newClient.id
          })
          .append($a);

/*         var $button = $("<button>")
          .addClass("btn btn-danger float-right")
          .text(newClient.phone_number);

        $li.append($button); */

        return $li;
      }
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

// Login for developers
var $nameInput = $("#nameInput");
var $passwordInput = $("#passwordInput");
var $submitButtonLogin = $("#submitButtonLogin");

var developerLogin = function() {
  var cliente = {
    name: $nameInput.val().trim(),
    password: $passwordInput.val().trim()
  };
  API.logDeveloper(cliente.name).then(function(dataName) {
    if (cliente.name === dataName.name) {
      console.log(dataName);
      API.loginDeveloper(dataName.password).then(function(data) {
        console.log(data);
        if (cliente.password === data.password && cliente.name === data.name) {
          localStorage.setItem("currDev", JSON.stringify(data.id))
          alert("Welcome " + data.name);
          window.location.href = "/developer";
        } else if (cliente.password !== data.password || cliente.name !== data.name) {
          alert("Invalid login information, please try again or sign up for a free account.");
        }
        $nameInput.val("");
        $passwordInput.val("");
      });
    } else {
      alert("Invalid login information, please try again or sign up for a free account.");
    }
  });
 };
 $submitButtonLogin.on("click", developerLogin);

// Logout for Developers
$("#logout").on("click", function() {
  localStorage.setItem("currDev", 0);
  window.location.href = "/"; 
});

// Random Inspirational Quote
API.getQuote().then(function(response) {
  console.log(response)
  var quoteText = response[0].text;
  var quoteAuthor = response[0].author;
  $("#quote").text("An inspirational quote for you: '" + quoteText + "' ~" + quoteAuthor);
});
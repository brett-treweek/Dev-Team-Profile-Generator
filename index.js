// -----------------------Dependencies---------------------------
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//----------------Array of team members to be created---------------
let devTeam = [];
let info;
// ---------------------------Inquirer-------------------------------

console.log(
  "============================== Dev Team Generator ============================="
);

inquirer
  .prompt([
    {
      type: "list",
      name: "addManager",
      message: "Would you like to add a Manager?",
      choices: ["Yes", "No"],
    },
  ])

  .then((answer) => {
    if (answer.addManager == "Yes") {
      let role = "Manager";
      questionsArray(role);
    } else {
      console.log("Every team needs a leader");
    }
  });

// ----------------Common Questions Array---------------------

function questionsArray(role) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: `What is the ${role} name?`,
        default: `Mr.${role}`,
        validate: (answer) => {
          if (answer === "") {
            return "Please enter a valid Name";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "employeeId",
        message: `What is the ${role} ID?`,
        default: `007`,
        validate: (answer) => {
          if (answer.type === NaN) {
            return "Please enter a valid Number";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "employeeEmail",
        message: `What is the ${role} Email?`,
        default: `${role}@gmail.com`,
      },
    ])
    .then((answers) => {
      info = [];

      if (role == "Manager") {
        let manager = new Manager(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail
        );
        manager.role = role;
        info.push(manager);
        managerQuestion();
      } else if (role == "Engineer") {
        let engineer = new Engineer(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail
        );
        engineer.role = role;
        info.push(engineer);
        engineerQuestion();
      } else {
        let intern = new Intern(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail
        );
        intern.role = role;
        info.push(intern);
        internQuestion();
      }
    });
}

// -----------Manager Question--------------------

function managerQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "Office_Number",
        message: "What is the Managers Office Number?",
        default: "911",
        validate: (answer) => {
          if (answer.type === NaN) {
            return "Please enter a valid Number";
          }
          return true;
        },
      },
    ])
    .then((response) => {
      info[0].officeNumber = response.Office_Number;
      devTeam.push(info[0]);
      newMember();
    });
}

// ------------Engineer Question------------------

function engineerQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "GitHub",
        message: "What is the Engineers GitHub username?",
        default: "brett-treweek",
        validate: (answer) => {
          if (answer === "") {
            return "Please enter a valid username";
          }
          return true;
        },
      },
    ])
    .then((response) => {
      info[0].gitHub = response.GitHub;
      devTeam.push(info[0]);
      newMember();
    });
}

// ------------Intern Question--------------------

function internQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "School",
        message: "What school does the Intern attend?",
        default: "UWA",
      },
    ])
    .then((response) => {
      info[0].school = response.School;
      devTeam.push(info[0]);
      newMember();
    });
}

// ----------------------newMember Function-------------------------

function newMember() {
  inquirer
    .prompt([
      {
        name: "new_Member",
        type: "list",
        message: "Would you like to add a new team member?",
        choices: ["Yes", "No"],
      },
    ])
    .then((response) => {
      response.new_Member === "Yes" ? whichMember() : generateHtml();
    });
}

// ------------------whichMember Function-------------------------

function whichMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "Add_team_member",
        message: "What is the new members role?",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])
    .then((response) => {
      let role = response.Add_team_member;
      questionsArray(role);
    });
}

// ----------------loop through DevTeam Array--------------

function generateHtml() {
  const cards = [];

  for (let i = 0; i < devTeam.length; i++) {
    const element = devTeam[i];

    if (element.role === "Engineer") {
      extra = `<span>GitHub: <span><a class="extra" href="https://github.com/${element.gitHub}">${element.gitHub}</a>`;
    } else if (element.role === "Manager") {
      extra = `<li class="extra">Office Number: ${element.officeNumber}</li>`;
    } else {
      extra = `<li class="extra">School: ${element.school}</li>`;
    }

    const cardTemplate = `
    <div style = 'background-image: url(./Images/${element.role}.jpg)' class="card">
    <div class="card-content">
    <h2 class="role">${element.role}</h2>
    <ul class="list">
        <li class="name">${element.name}</li>
        <li class="id">ID: ${element.id}</li>
        <li>Email: <a class="email" href="mailto:${element.email}">${element.email}</a></li>
        ${this.extra}
        
    </ul>
    </div>
</div>`;
    cards.push(cardTemplate);
  }

  const Template = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="../dist/CSS/style.css">
      <title>Development Team</title>
  </head>
  <body>
      <header class="header">
          <h1 class="title">Development Team</h1> 
      </header>
      <div class="wrapper">
          ${cards}
      </div>
  </body>
  </html>`;

  fs.writeFile("./dist/index.html", Template, (err) =>
    err ? console.err(err) : console.log("Success! index.html generated")
  );
}

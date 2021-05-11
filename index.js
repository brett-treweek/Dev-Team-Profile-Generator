// -----------------------Dependencies---------------------------
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//----------------Array of team members to be created---------------
let devTeam = [];
let info;
// ----------------------Inquirer Manager---------------------------
inquirer
  .prompt([
    {
      type: "list",
      name: "addManager",
      message: "Would you like to add a Manager?",
      choices: ['Yes', 'No'],
    },
  ])

  .then((answer) => {
    if(answer.addManager == 'Yes'){
      let role = 'Manager';
      questionsArray(role);
    }else {console.log('Every team needs a leader');
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
        default: `${role}007`,
      },
      {
        type: "input",
        name: "employeeEmail",
        message: `What is the ${role} Email?`,
        default: `${role}@gmail.com`,
      },

    ])
    .then((answers) => {
      // try and get rid of info array, create [i] for employees and push directly into dev team array.
      info = [];
      
      if (role == "Manager") {
        let manager = new Manager(answers.employeeName, answers.employeeId, answers.employeeEmail);
        console.log(manager);
        info.push(manager);
        info[0].role = role
        managerQuestion();
      } else if (role == "Engineer") {
        let engineer = new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail);
        info.push(engineer);
        info[0].role = role
        engineerQuestion();
      } else {
        let intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail);
        info.push(intern);
        info[0].role = role
        internQuestion();
    }});
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
      response.new_Member === "Yes" ? whichMember() : loop();
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
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((response) => {
      let role = response.Add_team_member;
      questionsArray(role);
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
      devTeam.push(info)
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
        default: 'Mr.Engineer-gitHub',
        validate: (answer) => {
          if (answer === "") {
            return "Please enter a valid username";
          }
          return true;
        },
      },
    ])
    .then((response) => {
      info[0].gitHub = response.GitHub
      devTeam.push(info)
      // console.log(devTeam)
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
      devTeam.push(info)
      // console.log(devTeam)
      newMember();
    });
}

// ----------------loop through DevTeam Array--------------

function loop(){
  for (let i = 0; i < devTeam.length; i++) {
    const element = devTeam[i];
    console.log(element[0].name)
  }
  console.log(devTeam)
  console.log(devTeam[1][0].getGitHub())
  console.log(devTeam[0][0].getRole())
  console.log(engineer)
}



















// .catch((error) => {
//   if (error.isTtyError) {
//     console.log("Prompt couldnt be rendered in the current environment");
//   } else {
//     console.log("Something else went wrong");
//   }
// });

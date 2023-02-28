const Manager = require('./lib/Man');
const Engineer = require('./lib/Eng');
const Intern = require('./lib/Int');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'fullteam.html');

const render = require('./src/html-gen.js');

const teamMembers = [];
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "What is the manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Enter a number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of team member would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "No more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "What is the engineer's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'engineerId',
          message: "What is the engineer's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken. Enter a different number.';
              } else {
                return true;
              }
            }
            return 'Enter a number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "What is the engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "What is the engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter at least one character.';
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "What is the intern's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: "What is the intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken. Enter a different number.';
              } else {
                return true;
              }
            }
            return 'Enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "What is the intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: "What is the intern's school?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter at least one character.';
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();

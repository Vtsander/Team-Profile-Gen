const Manager = require('./lib/Man');
const Engineer = require('./lib/Eng');
const Intern = require('./lib/Int');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const render = require('./src/html-gen');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'fullteam.html');
const teamMembers = [];
const idArray = [];

async function questions() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the employee?',
      validate: nameInput => nameInput ? true : 'Please enter their name.',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the employees id number?',
      validate: idInput => idInput ? true : 'Please enter their employee id number.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email address?',
      validate: emailInput => emailInput ? true : 'Please enter their email address.',
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is their role on the team?',
      choices: ['Manager', 'Engineer', 'Intern'],
    },
  ]);
  const addMemberAns = await inquirer.prompt([
    {
      name: 'addMember',
      type: 'list',
      choices: ['Add a another new member?', 'Finished adding members and create new team.'],
      message: 'Please choose a new team member.',
    },
  ]);

  if (addMemberAns.addMember === 'Add a new member') {
    await questions();
  } else {
    buildTeam();
  }
}

function buildTeam() {
  const html = render(teamMembers);

  fs.writeFile(distPath, html, (err) => {
    if (err) throw err;
    console.log(`Team profile generated at ${distPath}`);
  });
}

async function appMenu() {
  await questions();
}

appMenu();
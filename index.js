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

  switch (answers.role) {
    case 'Manager':
      const managerAns = await inquirer.prompt([
        {
          type: 'input',
          name: 'officeNumber',
          message: 'What is their Office Number?',
          validate: officeNumberInput => officeNumberInput ? true : 'Please enter their office Number.',
        },
      ]);
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        managerAns.officeNumber
      );
      teamMembers.push(newManager);
      break;
    case 'Engineer':
      const githubAns = await inquirer.prompt([
        {
          type: 'input',
          name: 'github',
          message: 'What is their github username?',
        },
      ]);
      const newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        githubAns.github
      );
      teamMembers.push(newEngineer);
      break;
    case 'Intern':
      const internAns = await inquirer.prompt([
        {
          type: 'input',
          name: 'school',
          message: 'What school did they attend?',
        },
      ]);
      const newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        internAns.school
      );
      teamMembers.push(newIntern);
      break;
  }
  const addMemberAns = await inquirer.prompt([
    {
      name: 'addMember',
      type: 'list',
      choices: ['Add another new member?', 'Finished adding members and create new team.'],
      message: 'Please choose a new team member.',
    },
  ]);

  if (addMemberAns.addMember === 'Add another new member?') {
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
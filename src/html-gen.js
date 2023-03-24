const generateManager = manager => {
    return `
      <div class="card employee-card">
        <div class="card-header">
          <h2 class="card-title">${manager.getLastName()},${manager.getName()}</h2>
          <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${manager.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
            <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
          </ul>
        </div>
      </div>
    `;
  };
  
  const generateEngineer = engineer => {
    return `
      <div class="card employee-card">
        <div class="card-header">
          <h2 class="card-title">${engineer.getLastName()}, ${engineer.getName()}</h2>
          <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${engineer.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
          </ul>
        </div>
      </div>
    `;
  };
  
  const generateIntern = intern => {
    return `
      <div class="card employee-card">
        <div class="card-header">
          <h2 class="card-title">${intern.getLastName()}, ${intern.getName()}</h2>
          <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${intern.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
            <li class="list-group-item">School: ${intern.getSchool()}</li>
          </ul>
        </div>
      </div>
    `;
  };
  
  const generateTeam = team => {
    const teamHtml = team.map(employee => {
      switch (employee.getRole()) {
        case "Manager":
          return generateManager(employee);
        case "Engineer":
          return generateEngineer(employee);
        case "Intern":
          return generateIntern(employee);
        default:
          return "";
      }
    });
  
    return teamHtml.join("");
  };
  
  const generatePage = team => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>My Team</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Department</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateTeam(team)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

function render(teamMembers) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Team</title>
      </head>
      <body>
        <header>
          <h1>My Team</h1>
        </header>
        <main>
          <div class="team-members">
            ${teamMembers
              .map(
                (member) =>
                  `
              <div class="member">
                <h2>${member.getLastName()},${member.getName()}</h2>
                <p>${member.getRole()}</p>
                <ul>
                  <li>ID: ${member.getId()}</li>
                  <li>Email: <a href="mailto:${member.getEmail()}">${member.getEmail()}</a></li>
                  ${
                    member.getRole() === 'Manager'
                      ? `<li>Office number: ${member.getOfficeNumber()}</li>`
                      : member.getRole() === 'Engineer'
                      ? `<li>GitHub: <a href="https://github.com/${member.getGithub()}">${member.getGithub()}</a></li>`
                      : `<li>School: ${member.getSchool()}</li>`
                  }
                </ul>
              </div>
            `
              )
              .join('')}
          </div>
        </main>
      </body>
    </html>
  `;

  return html;
}

module.exports = render;

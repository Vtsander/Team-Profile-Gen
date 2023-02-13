// Removes the team.html file from the dist/ folder.
// Used in `npm run reset` script

const fs = require('fs');
if (fs.existsSync('./dist/fullteam.html')) {
  fs.unlinkSync('./dist/fullteam.html');
  console.log('/dist/ folder reset!');
}

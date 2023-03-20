const fs = require('fs');

try {
  fs.unlinkSync('./dist/fullteam.html');
  console.log('/dist/ folder reset!');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('File not found, nothing to delete.');
  } else {
    throw err;
  }
}

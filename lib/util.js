const fs = require('fs');

const isDirectory = valueToCheck => fs.existsSync(valueToCheck) && fs.lstatSync(valueToCheck).isDirectory();

const errorHandler = (err) => {
  if (!err) {
    return;
  }
  if(err instanceof Error) {
    throw err
  }
  throw new Error(err); 
}

module.exports = {
  isDirectory,
  errorHandler
}
const { exec } = require("child_process");
const expect = require('chai').expect;

describe('argument validation', () => {
  it('should give an error if pages directory is not provided', (done) => {
    exec('./bin/react-bootstrap-static-gen.js', (error, stdout, stderr) => {
      expect(stderr).to.contain('pages-directory must be specified.');
      done();
    });
  });
  it('should give an error if pages directory is not a directory', (done) => {
    exec('./bin/react-bootstrap-static-gen.js ./not-a-directory', (error, stdout, stderr) => {
      expect(stderr).to.contain('pages-directory must be a directory.');
      done();
    });
  });
  it('should give an error if more than one outut-dir', (done) => {
    exec('./bin/react-bootstrap-static-gen.js --output-dir=./foo --output-dir=./bar ./test/pages', (error, stdout, stderr) => {
      expect(stderr).to.contain('output-dir must be a single value.');
      done();
    });
  });
});

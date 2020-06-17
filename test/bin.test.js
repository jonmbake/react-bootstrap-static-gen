const { exec } = require("child_process");
const fs = require('fs');
var expect = require('chai').expect;

describe('validation', () => {
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
});

describe('page rendering', () => {
  beforeEach(done => {
    if(fs.existsSync('./test/pages-output/testPage.html')) {
      console.log('removing dir')
      fs.unlink('./test/pages-output/testPage.html', done);
    } else {
      done();
    }
  });
  it('should render pages to pages-output with proper html body and page title', (done) => {
    exec('./bin/react-bootstrap-static-gen.js ./test/pages', (error, stdout, stderr) => {
      fs.readFile('./test/pages-output/testPage.html', 'utf8', (err, data) => {
        expect(data).to.contain('<div class="jumbotron">Testing a jombotron!</div');
        expect(data).to.contain('<title>Test Page</title>');
        done();
      });
    });
  }) 
  it('should default to using bootstrap 4.5.0 cdn for styling', (done) => {
    exec('./bin/react-bootstrap-static-gen.js ./test/pages', (error, stdout, stderr) => {
      fs.readFile('./test/pages-output/testPage.html', 'utf8', (err, data) => {
        expect(data).to.contain('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">');
        done();
      });
    });
  });
  it('should allow for overriding default bootstrap styling', (done) => {
    exec('./bin/react-bootstrap-static-gen.js --style=custom-style.css ./test/pages', (error, stdout, stderr) => {
      fs.readFile('./test/pages-output/testPage.html', 'utf8', (err, data) => {
        expect(data).to.contain('<link rel="stylesheet" href="custom-style.css">');
        done();
      });
    });
  });
});
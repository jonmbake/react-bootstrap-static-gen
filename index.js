const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

require('@babel/register')({presets: ["@babel/preset-env", "@babel/preset-react"]});

const htmlTemplate = (pageTitle = '', pageBody, style) => {
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ pageTitle }</title>
  <link rel="styleheet" href="${ style }">
</head>
<body>
  ${ pageBody }
</body>
</html>
`.trim();
};

// A few utility functions
const isDirectory = v => fs.existsSync(v) && fs.lstatSync(v).isDirectory();
const errorHandler = (err) => {
  if (!err) {
    return;
  }
  if(err instanceof Error) {
    throw err
  }
  throw new Error(err); 
}
// Parse CLI arguments and do a bit of validation
const {_: pagesDirectory, o: outputDirectory = `${pagesDirectory}-output`, d: debug, s: style} = args = require('yargs')
    .usage('Usage: $0 [options] <pages-directory>')
    .option('o', {
      alias: 'output-dir',
      describe: 'The directory where the pages should get generated to.',
    })
    .option('d', {
      alias: 'debug',
      default: false,
      describe: 'Print debugging information.',
      type: 'boolean'
    })
    .option('s', {
      alias: 'style',
      default: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
      describe: 'Bootstrap styling URL to use. Must be absolute, or relative to the output directory.',
      type: 'string'
    })
    .coerce('_', a => {
      if (a.length === 0) {
        errorHandler('pages-directory must be specified.');
      }
      if (!isDirectory(a[0])) {
        errorHandler('pages-directory must be a directory.');
      }
      return a[0];
    })
    .help()
    .argv;

  //console.log('CLI arguments ' + JSON.stringify(args));
fs.readdir(pagesDirectory, (err, pageFiles) => {
  errorHandler(err);
  pageFiles.forEach(pageFile => {
    const pageFilePath = path.resolve(pagesDirectory, pageFile);
    if (debug) {
      console.log('Reading page file at ' + pageFilePath);
    }
    if (!isDirectory(path.resolve(outputDirectory))) {
      fs.mkdir(path.resolve(outputDirectory), {}, errorHandler);
    }
    const fileExt = path.parse(pageFilePath).ext;
    // Skip any files that are not react
    if(fileExt === '.jsx' || fileExt === '.js') {
      const page = require(pageFilePath);
      const pageComponent = page.default || page;
      const pageRendered = ReactDOMServer.renderToStaticMarkup(React.createElement(pageComponent));
      const html = htmlTemplate(page.title, pageRendered, style);
      fs.writeFile(
        path.resolve(outputDirectory, pageFile).replace(/\.[^.]+$/, '.html'),
        html,
        errorHandler
      );
    }
  });
});
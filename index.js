const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { isDirectory, errorHandler } = require('./lib/util');

require('@babel/register')({presets: ["@babel/preset-env", "@babel/preset-react"]});

const htmlTemplate = (pageTitle = '', pageBody, style) => {
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ pageTitle }</title>
  ${ style.map(s => '<link rel="stylesheet" href="' + s + '">') }
</head>
<body>
  ${ pageBody }
</body>
</html>
`.trim();
};

function renderPages () {
  fs.readdir(pagesDirectory, (err, pageFiles) => {
    errorHandler(err);
    pageFiles.forEach(pageFile => {
      const pageFilePath = path.resolve(pagesDirectory, pageFile);
      if (debug) {
        console.log('Reading page file at: ' + pageFilePath);
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
        const outputPath = path.resolve(outputDirectory, pageFile).replace(/\.[^.]+$/, '.html');
        if (debug) {
          console.log('Writing generate page to: ' + outputPath);
        }
        fs.writeFile(
          outputPath,
          html,
          errorHandler
        );
      }
    });
  });
}

module.exports = renderPages;
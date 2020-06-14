![CI](https://github.com/jonmbake/react-bootstrap-static-gen/workflows/CI/badge.svg)

# react-bootstrap-static-gen

A dead-simple static page generator for [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap). This
library is a great option if you already use _react-bootstrap_ for your react app and want to generate a few static pages--
like a landing page.

Note: This uses [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) under the hood and has the same limitations.

## Getting Started

```
npm install react-bootstrap-static-gen
```

```
> ./node_modules/react-bootstrap-static-gen/index.js --help
Usage: index.js [options] <pages-directory>

Options:
  --version         Show version number                                [boolean]
  -o, --output-dir  The directory where the pages should get generated to.
  -d, --debug       Print debugging information.      [boolean] [default: false]
  -s, --style       Bootstrap styling URL to use. Must be absolute, or relative
                    to the output directory.                  [string] [default:
     "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"]
  --help            Show help                                          [boolean]
```

Note: if running in a package.json script, you can use `react-bootstrap-static-gen` instead of `./node_modules/react-bootstrap-static-gen/index.js`.

## Example Usage

To generate all of the `.js` or `.jsx` files in the `pages` directory into `pages-output` directory:

```
react-bootstrap-static-gen ./pages
```
For example, if the file _./pages/homePage.jsx_ existed with the following content:

```
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

function TestPage (props) {
  return <Jumbotron>Testing a jombotron!</Jumbotron>
}

export const title = 'Test Page';
export default TestPage;
```

A corresponding _./pages-output/homePage.html_ would get generated:

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test Page</title>
  <link rel="styleheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
</head>
<body>
  <div class="jumbotron">Testing a jombotron!</div>
</body>
</html>
```
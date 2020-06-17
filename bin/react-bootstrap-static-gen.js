#!/usr/bin/env node
const staticGen = require('../index');

staticGen({_: pagesDirectory, o: outputDirectory = `${pagesDirectory}-output`, debug, style} = require('../lib/argumentParser'));
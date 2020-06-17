const { isDirectory, errorHandler } = require('../lib/util');

// Parse CLI arguments and do a bit of validation
const args = require('yargs')
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
    .coerce('style', s => {
      if (Array.isArray(s)) {
        return s;
      }
      return [s];
    })
    .check(argvs => {
      if (Array.isArray(argvs['output-dir'])) {
        errorHandler('output-dir must be a single value.');
      }
      return true;
    })
    .strict()
    .help()
    .argv;

if (args.d) {
  console.log('CLI arguments:\n' + JSON.stringify(args, null, 2));
}

module.exports = args;
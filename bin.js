#!/usr/bin/env node

/**
 * Run dockerize against a language pack.
 *
 * @module dockerreduce/bin
 */


// Modules
const yargs     = require('yargs');
const _         = require('lodash');
const dockerreduce = require('./index');


// Dockerize
(async () => {

    try {

        // Get args and validate
        let argv = yargs.argv;
        let args = argv._;
        if (args.length !== 1) {
            throw new Error('Usage: dockerizeme [--language=] [--cmd=] [--arg= [--arg= [...]]] <package>');
        }

        // Get language, package name, and version
        let language = argv.language;
        let pkg = args[0];

        // Get command
        let cmd;
        if (argv.cmd) {
            cmd = _.omitBy({
                command: argv.cmd,
                args: _.isArray(argv.arg) ? argv.arg : [ argv.arg ]
            }, _.isUndefined);
        }

        // Dockerize
        let contents = await dockerreduce(_.omitBy({
            pkg,
            language,
            cmd
        }, _.isUndefined));
        console.log(contents);

    }
    catch(e) {
        console.error(e.message);
        process.exit(1);
    }

})();
/**
 * @module dockerreduce
 */

// Core/NPM Modules
const Bluebird        = require('bluebird');

// Local Modules
const StrategyFactory = require('./delta/factory');
const factory = new StrategyFactory();
const Runner = require('./delta/runner');

/**
 * Reduce a Dockerfile based on a test script.
 *
 * @param   {Object}         options             Dockerize options
 * @param   {String}         options.pkg         Package name.
 * @param   {Object}         options.language    Language used to build dockerfile.
 * @param   {Object}         options.cmd         Command to run at startup.
 * @param   {String}         options.cmd.command Run command.
 * @param   {Array.<String>} options.cmd.args    Command arguments.
 * @returns {String}                             Dockerfile contents
 */
module.exports = async function(options = {}) {
    
    // Get language strategy
    let strategy = await factory.get(options.language || 'Dockerfile');

    let runner = new Runner("docker build .");

    // Generate dockerfile
    let data = await strategy.createVariations(options, "a\nb\nc\nd\ne\nf", runner);
    return data;
    // return Bluebird.fromCallback(cb => generator.generate(JSON.stringify(data), cb));

};
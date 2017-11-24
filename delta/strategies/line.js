/**
 * @module strategies/line
 */


// Core/NPM Modules
const path             = require('path');
const _                = require('lodash');

// Local Modules
const DeltaStrategy = require('../delta-strategy.js');

class LineStrategy extends DeltaStrategy {

    constructor(options = {}) {
        super(_.assign(options, {
            language: 'line'
        }));
    }

    async createVariations(name, calls) {
        return "hello"
    }
}

module.exports = LineStrategy;
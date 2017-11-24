/**
 * @module strategies/line
 */


// Core/NPM Modules
const path             = require('path');
const _                = require('lodash');
const os               = require('os');
const fs               = require('fs');

// Local Modules
const DeltaStrategy = require('../delta-strategy.js');

class LineStrategy extends DeltaStrategy {

    constructor(options = {}) {
        super(_.assign(options, {
            language: 'line'
        }));
    }

    async createVariations(options, original) {
        let tmp = os.tmpdir();
        let dir = path.join(tmp, process.getgid())
        let lines = original.split('\n');

        for( var i = 0; i < lines.length; i++ )
        {
            let keepLines = Array(lines.length).fill(true);
            keepLines[i] = false;

            let generated = string.join("\n", lines.filter( (value, index) => keepLines[index] ));
            let genFilePath = path.join(dir, 'Dockerfile')
            fs.writeFileSync( genFilePath, generated);

            runner.run()
        }

    }
}

module.exports = LineStrategy;
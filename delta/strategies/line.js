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

    async createVariations(options, original, runner) {
        let tmp = os.tmpdir();
        let dir = path.join(tmp, 'dockerreduce'+process.pid.toString())
        fs.mkdirSync(dir);

        let lines = original.split('\n');

        let initial = Array(lines.length).fill(true);
        let validStates = [initial];

        while( validStates.length > 0 )
        {
            var state = validStates.pop();

            for( var i = 0; i < lines.length; i++ )
            {
                // This state is already mutated, stop exploring.
                if( state[i] == false )
                    continue
                // Simple way to clone array.
                let keepLines = state.slice();
                keepLines[i] = false;

                let filtered = lines.filter( (value, index) => keepLines[index] );

                if( filtered.length > 0 )
                {
                    let generated =  filtered.join("\n");
                    let genFilePath = path.join(dir, 'Dockerfile')

                    fs.writeFileSync( genFilePath, generated);

                    console.log(generated)

                    let status = await runner.run(dir);
                    if( status.error === undefined )
                    {
                        console.log( status )
                        console.log( `code: ${status.error.code} err: ${status.stderr}`)
                    }
                    else{ validStates.push( keepLines ); }
                }
            }
            console.log(`states: ${validStates.length}`);
        }
        

    }
}

module.exports = LineStrategy;
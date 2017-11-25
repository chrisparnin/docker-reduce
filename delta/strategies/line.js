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

        return new Promise( async(resolve, reject) =>
        {
            let tmp = os.tmpdir();
            let dir = path.join(tmp, 'dockerreduce'+process.pid.toString())
            fs.mkdirSync(dir);

            let lines = original.split('\n');

            let initial = Array(lines.length).fill(true);
            let validStates = [initial];
            let lastState = initial;

            while( validStates.length > 0 )
            {
                var state = validStates.pop();
                lastState = state;

                for( var i = 0; i < lines.length; i++ )
                {
                    // This state is already mutated, stop exploring.
                    if( state[i] == false )
                        continue
                    // Simple way to clone array.
                    let keepLines = state.slice();
                    keepLines[i] = false;

                    let filtered = lines.filter( (value, index) => keepLines[index] );

                    if( filtered.length > 1 )
                    {
                        let generated =  filtered.join("\n");
                        let genFilePath = path.join(dir, 'Dockerfile')

                        fs.writeFileSync( genFilePath, generated);

                        console.log(generated)

                        let status = await runner.run(dir);
                        if( status.error && status.error.code != 0 )
                        {
                            console.log( `code: ${status.error.code} err: ${status.stderr}`)
                        }
                        else{ 
                            validStates.push( keepLines ); 
                        }
                    }
                }
                console.log(`states: ${validStates.length}`);
            }
            
            console.log( "REDUCED STATE: ")
            console.log( "~~~~~~~~~~~~~~~")
            
            let reduced = lines.filter( (value, index) => lastState[index] )
            let output = reduced.join("\n")
            console.log(output)
            resolve(output);
        });
    }
}

module.exports = LineStrategy;
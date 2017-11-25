/**
 * @module runner
 */

const { exec } = require('child_process');
const Promise = require('bluebird');

class Runner {

    constructor(script) {
        this.script = script;
    }

    async run(path)
    {
        return new Promise(async (resolve, reject) => {
            let cmd = `cd ${path} && ${this.script}`;
            try
            {
                exec(cmd, (err, stdout, stderr) => {
                    if (err) {
                        console.log( err )
                        resolve({error: err, stderr: stderr});
                    }
                    resolve({error: undefined, stdout: stdout});
                });
            }
            catch(err)
            {
                resolve({error: err, stderr: "exception"});
            }
        });
    }
}

module.exports = Runner;
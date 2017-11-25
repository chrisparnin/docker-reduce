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
            exec(this.script, (err, stdout, stderr) => {
            if (err) {
                reject({error: err, stderr: stderr});
            }
            resolve({error: null, stdout: stdout});
            });
        });
    }
}

module.exports = Runner;
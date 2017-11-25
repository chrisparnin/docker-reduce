/**
 * @module runner
 */

const { exec } = require('child_process');
const Promise = require('bluebird');
const docker_run = require('docker-run');

class Runner {

    constructor(script, cmd, imageTag) {
        this.script = script;
        this.cmd = cmd; 
        this.imageTag = imageTag;
    }

    async runCodeSnippet(code)
    {
        let tag = this.imageTag;
        return new Promise(async function (resolve, reject) 
        {
            let options = {
                volumes: {},
                entrypoint: 'python',
                argv: `-c${code}`
            }
            //options.volumes[__dirname] = "/docbot"
            var child = docker_run(tag, options);
            
            child.stderr.pipe(process.stderr)
            
            let buf = ""
            child.stdout.on('data', (data) => {
                buf += data;
            });

            child.on('exit', (code) => {
                resolve( {exitCode: code, output: buf} )
            });
            child.on('error', (err) => {
                resolve( {exitCode: 1, output: "error"});
            });
        });
    }


    async run(path)
    {
        return new Promise(async (resolve, reject) => {
            let build = `cd ${path} && ${this.script}`;
            try
            {
                exec(build, async (err, stdout, stderr) => {
                    if (err) {
                        resolve({error: err, stderr: err.message});
                    }
                    else
                    {
                        let res = await this.runCodeSnippet(this.cmd);
                        if( res.exitCode == 0 )
                        {
                            resolve( {error: undefined, stdout: res.output} );
                        }
                        else
                        {
                            resolve( {error: {code: 1}, stderr: "error"} );
                        }
                    }
                    
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
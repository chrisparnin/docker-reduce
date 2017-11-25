/**
 * @module docker
 */

const pull = require('docker-pull');
const Promise = require('bluebird');

function doPull(image)
{
    return new Promise(function (resolve, reject) 
	{
        var p = pull(image)

        p.on('progress', function () {
            console.log('pulled %d new layers and %d/%d bytes', p.layers, p.transferred, p.length)
        })

        p.on('end', function () {
            resolve()
        })
    });
}
module.exports.doPull = doPull;
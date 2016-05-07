module.exports = function(options) {
    var fs = require('fs');
    const exec = require('child_process').exec;
    var directory = './app/src/algorithms/fpgrowth';
    var result;
    const child = exec(directory + '/src/fpgrowth -s' + options.s +
                                                ' -m' + options.m +
                                                ' -q' + options.q +
                                                ' -b, ' + options.f + 
                                                ' test1.csv',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        if (error !== null) {
            console.log(`exec error: ${error}`);
        } else {
            return true;
        }
    });
}
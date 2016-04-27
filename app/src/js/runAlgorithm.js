module.exports = function(options) {
    var fs = require('fs');
    const exec = require('child_process').exec;
    var directory = './app/src/algorithms/fpgrowth';
    var result;
    const child = exec(directory + '/src/fpgrowth -s' + options.s +
                                                ' -m' + options.m +
                                                ' -q' + options.q +
                                                ' -b, ' + directory + 
                                                '/ex/census.dat test1.csv',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        //var file = fs.readFileSync('test1.out');
        //document.write(file);

        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}
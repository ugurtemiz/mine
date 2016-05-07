module.exports = function(options) {
    const exec = require('child_process').exec;
    var directory = './app/src/algorithms/fpgrowth';
    var result;
    var command =   directory + '/src/fpgrowth -s' + options.s +
                                                ' -m' + options.m +
                                                ' -q' + options.q +
                                                ' -b, ' + options.f + 
                                                ' test1.csv';

    if (process.platform == 'win32') {
        command = command.replace('src/fpgrowth', 'src/fpgrowth.exe');
        command = command.split('/').join('\\');
    }

    const child = exec(command,
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
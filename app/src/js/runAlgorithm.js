var fs = require('fs');
const exec = require('child_process').exec;
var directory = './app/src/algorithms/fpgrowth';
var result;
const child = exec(directory + '/src/fpgrowth ' + directory + '/ex/test1.tab test1.out',
(error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    var file = fs.readFileSync('test1.out'); 
    document.write(file);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
    getResult(stdout);
});

var getResult = function (stdout) {
    return stdout;
}

module.exports = getResult;  
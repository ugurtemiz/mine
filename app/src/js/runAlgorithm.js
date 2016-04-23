var fs = require('fs');
const exec = require('child_process').exec;
var directory = './app/src/algorithms/fpgrowth';
var result;
//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

const child = exec(directory + '/src/fpgrowth -s0.5 -m3 -q-1 -b, ' + directory + '/ex/test1.tab test1.out',
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
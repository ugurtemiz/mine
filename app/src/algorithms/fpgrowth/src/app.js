const exec = require('child_process').exec;
const child = exec('./fpgrowth ../ex/test1.tab test1.out',
  (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
});
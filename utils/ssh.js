const Ssh = require('simple-ssh');

module.exports = ssh;

function ssh(options) {
    return new Promise((resolve, reject) => {
        let ssh = new Ssh(options);        

        //TODO should be used time zones
        let startTime = new Date();

        console.log('start', options);
        ssh.exec(options.command, {
            exit: (code, stdout, stderr) => {

                console.log('finished');
                let endTime = new Date();
                return resolve({
                    code: code,
                    stdout: stdout,
                    stderr: stderr,
                    startedAt: startTime,
                    finishedAt: endTime,
                });
            },
        }).start()
    });
}



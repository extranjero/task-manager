const Ssh = require('simple-ssh');

module.exports = ssh;

function ssh(options) {
    return new Promise((resolve, reject) => {
        let ssh = new Ssh(options);        

        //TODO should be used time zones
        let startTime = new Date();

        ssh.exec(options.command, {
            exit: (code, stdout, stderr) => {

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



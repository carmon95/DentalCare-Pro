const { spawn } = require("child_process");
const path = require("path");

let backendProcess = null;

function startBackend() {

    const backendPath = path.join(
        __dirname,
        "../backend"
    );

    backendProcess = spawn(

        "npm",

        ["start"],

        {

            cwd: backendPath,

            shell: true,

            windowsHide: true

        }

    );

    backendProcess.stdout.on(

        "data",

        (data) => {

            console.log(

                "[Backend]",

                data.toString()

            );

        }

    );

    backendProcess.stderr.on(

        "data",

        (data) => {

            console.error(

                "[Backend Error]",

                data.toString()

            );

        }

    );

}

module.exports = {

    startBackend,

    getBackendProcess: () => backendProcess

};
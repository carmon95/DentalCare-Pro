const { spawn } = require("child_process");
const kill = require("tree-kill");
const path = require("path");

class BackendService {

    constructor() {

        this.process = null;

    }

    start() {

        if (this.process) {

            console.log("Backend ya iniciado.");

            return;

        }

        console.log("Iniciando Backend...");

       const path = require("path");

const backendPath = path.join(
    __dirname,
    "../../../backend/server.js"
);

this.process = spawn(

    "node",

    [backendPath],

    {

        windowsHide: true

    }

);

        this.process.stdout.on(

            "data",

            (data) => {

                console.log(

                    "[Backend]",

                    data.toString()

                );

            }

        );

        this.process.stderr.on(

            "data",

            (data) => {

                console.error(

                    "[Backend Error]",

                    data.toString()

                );

            }

        );

        this.process.on("exit", (code) => {

    console.log(`Backend finalizado. Código: ${code}`);

});

    }

       stop() {

        if (!this.process) {

            return;

        }

        console.log("Deteniendo backend...");

        this.process.kill("SIGINT");

        this.process = null;

    }

}

module.exports = new BackendService();
const { app } = require("electron");

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

let backendPath;

if (app.isPackaged) {

  backendPath = path.join(

    process.resourcesPath,

    "publish",

    "backend",

    "server.js"

);

}
else {

    backendPath = path.join(

        __dirname,

        "../../../backend/server.js"

    );

}

let nodeExecutable;

if (app.isPackaged) {

    nodeExecutable = path.join(

        process.resourcesPath,

        "publish",

        "runtime",

        "nodejs",

        "node.exe"

    );

}
else {

    nodeExecutable = "node";

}

this.process = spawn(

    nodeExecutable,

    [

        backendPath

    ],

    {

        cwd: path.dirname(backendPath),

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
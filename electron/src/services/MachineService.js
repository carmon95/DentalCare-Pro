const { execFile } = require("child_process");
const crypto = require("crypto");
const os = require("os");

class MachineService {

    constructor() {

        this.machineId = null;

    }

    async getMachineId() {

        if (this.machineId) {

            return this.machineId;

        }

        return new Promise((resolve, reject) => {

            execFile(

                "powershell.exe",

                [
                    "-NoProfile",
                    "-ExecutionPolicy",
                    "Bypass",
                    "-Command",
                    "(Get-CimInstance Win32_ComputerSystemProduct).UUID"
                ],

                (error, stdout, stderr) => {

                    if (error) {

                        return reject(error);

                    }

                    const uuid = stdout.trim();

                    if (!uuid) {

                        return reject(

                            new Error("No fue posible obtener el UUID.")

                        );

                    }

                    const raw = [

                        uuid,

                        os.hostname()

                    ].join("|");

                    const hash = crypto
                        .createHash("sha256")
                        .update(raw)
                        .digest("hex")
                        .toUpperCase();

                    this.machineId = hash;

                    resolve(hash);

                }

            );

        });

    }

}

module.exports = new MachineService();
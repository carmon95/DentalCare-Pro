const fs = require("fs");
const path = require("path");

const CryptoService = require("./CryptoService");
const MachineService = require("./MachineService");

class LicenseService {

    constructor() {

    const { app } = require("electron");

    this.licensePath = app.isPackaged

        ? path.join(

            process.resourcesPath,

            "publish",

            "license",

            "license.dat"

        )

        : path.join(

            __dirname,

            "../../../license/license.dat"

        );

}
async validate() {

    try {

        if (!fs.existsSync(this.licensePath)) {

            return {
                valid: false,
                reason: "LICENSE_NOT_FOUND"
            };

        }

        const content = fs.readFileSync(
            this.licensePath,
            "utf8"
        );

        const license = JSON.parse(content);

        if (!license.signature) {

            return {
                valid: false,
                reason: "INVALID_LICENSE"
            };

        }

        const signature = license.signature;

        delete license.signature;

        const verified = CryptoService.verify(
            license,
            signature
        );

        if (!verified) {

            return {
                valid: false,
                reason: "INVALID_SIGNATURE"
            };

        }

        const machineId =
            await MachineService.getMachineId();

        if (machineId !== license.machineId) {

            return {
                valid: false,
                reason: "INVALID_MACHINE"
            };

        }

        return {

            valid: true,

            data: license

        };

    }

    catch (error) {

        console.error(error);

        return {

            valid: false,

            reason: "LICENSE_READ_ERROR"

        };

    }

}


    // 👇 NUEVO MÉTODO
    async isActivated() {

        const result = await this.validate();

        return result.valid;

    }

}

module.exports = new LicenseService();
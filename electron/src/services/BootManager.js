const ConfigService = require("./ConfigService");
const LicenseService = require("./LicenseService");

class BootManager {

    async getInitialRoute() {

        const activated =
            await LicenseService.isActivated();

        if (!activated) {

            return "/activation";

        }

        if (!ConfigService.exists()) {

            return "/setup";

        }

        return "/login";

    }

}

module.exports = new BootManager();
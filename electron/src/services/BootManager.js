const ConfigService = require("./ConfigService");
const LicenseService = require("./LicenseService");

class BootManager {

   async getInitialRoute() {

    if (!ConfigService.exists()) {

        return "/setup";

    }

    const config = ConfigService.load();

    const activated = await LicenseService.isActivated();

    if (!activated) {

        return "/activation";

    }

    return "/login";

}

}

module.exports = new BootManager();
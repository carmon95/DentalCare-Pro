const ConfigService = require("./ConfigService");
const LicenseService = require("./LicenseService");

class BootManager {

    async getInitialRoute() {

        // 1. ¿Existe configuración?

        const config = ConfigService.load();

        if (!config) {

            return "/setup";

        }

        // 2. ¿Licencia activada?

        const activated = await LicenseService.isActivated();

        if (!activated) {

            return "/activation";

        }

        // 3. Todo correcto

        return "/login";

    }

}

module.exports = new BootManager();
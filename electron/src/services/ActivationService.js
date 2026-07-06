const WindowService = require("./WindowService");

class ActivationService {

    async activate(isDev) {

        WindowService.navigate(

            isDev,

            "/"

        );

        return {

            success: true

        };

    }

}

module.exports = new ActivationService();
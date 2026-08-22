const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class ConfigService {

    constructor() {

        this.configPath = path.join(
            app.getPath("userData"),
            "config.json"
        );

    }

    exists() {

        return fs.existsSync(this.configPath);

    }

  load() {

    if (!this.exists()) {

        return null;

    }

    return JSON.parse(

        fs.readFileSync(

            this.configPath,

            "utf8"

        )

    );

}

    save(config) {

        fs.writeFileSync(

            this.configPath,

            JSON.stringify(

                config,

                null,

                4

            )

        );

    }

}

module.exports = new ConfigService();
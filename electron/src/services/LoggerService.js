const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class LoggerService {

    constructor() {

        this.logPath = path.join(

            app.getPath("userData"),

            "install.log"

        );

    }

    getTimestamp() {

        return new Date().toLocaleString();

    }

    write(level, message) {

        const line =
            `[${this.getTimestamp()}] [${level}] ${message}\n`;

        fs.appendFileSync(

            this.logPath,

            line,

            "utf8"

        );

        console.log(line.trim());

    }

    info(message) {

        this.write(

            "INFO",

            message

        );

    }

    warn(message) {

        this.write(

            "WARN",

            message

        );

    }

    error(message) {

        this.write(

            "ERROR",

            message

        );

    }

    clear() {

        fs.writeFileSync(

            this.logPath,

            "=========================================\n" +
            "DentalCare Pro Installation Log\n" +
            `Fecha: ${this.getTimestamp()}\n` +
            "=========================================\n\n"

        );

    }

}

module.exports = new LoggerService();
const { BrowserWindow } = require("electron");
const path = require("path");

class SplashScreenService {

    constructor() {

        this.window = null;

    }

    create() {

        this.window = new BrowserWindow({

            width: 500,

            height: 320,

            frame: false,

            transparent: false,

            resizable: false,

            maximizable: false,

            minimizable: false,

            alwaysOnTop: true,

            center: true,

            show: false,

            webPreferences: {

                nodeIntegration: true,

                contextIsolation: false

            }

        });

        this.window.loadFile(

            path.join(

                __dirname,

                "../../assets/splash.html"

            )

        );

        this.window.once(

            "ready-to-show",

            () => {

                this.window.show();

            }

        );

    }

    close() {

        if (this.window) {

            this.window.close();

            this.window = null;

        }

    }

}

module.exports = new SplashScreenService();
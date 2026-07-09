const { BrowserWindow, app } = require("electron");
const path = require("path");
const AppConfig = require("../config/AppConfig");

class WindowService {

    constructor() {

        this.mainWindow = null;

    }

  createMainWindow(isDev, route = "/") {
        this.mainWindow = new BrowserWindow({

            width: AppConfig.WINDOW.WIDTH,

            height: AppConfig.WINDOW.HEIGHT,

            minWidth: AppConfig.WINDOW.MIN_WIDTH,

            minHeight: AppConfig.WINDOW.MIN_HEIGHT,

            autoHideMenuBar: true,

            title: AppConfig.APP.NAME,

            show: false,

            webPreferences: {

                preload: path.join(

                    __dirname,

                    "../../preload.js"

                )

            }

        });
console.log("Ruta inicial:", route);

if (isDev) {

this.mainWindow.loadURL(
    `http://localhost:5173/#${route}`
);

}

else {

    this.mainWindow.loadFile(

        path.join(

            process.resourcesPath,

            "publish",

            "frontend",

            "index.html"

        ),

        {

            hash: route.replace("/", "")

        }

    );

}

        this.mainWindow.once(

            "ready-to-show",

            () => {

                this.mainWindow.show();

            }

        );

    }

    getMainWindow() {

        return this.mainWindow;

    }

    navigate(isDev, route) {

    if (!this.mainWindow)
        return;

    if (isDev) {

      this.mainWindow.loadURL(
    `http://localhost:5173/#${route}`
);

    }

    else {

 this.mainWindow.loadFile(

    path.join(

        process.resourcesPath,

        "publish",

        "frontend",

        "index.html"

    ),

    {

        hash: route.replace("/", "")

    }

);

    }

}

}

module.exports = new WindowService();
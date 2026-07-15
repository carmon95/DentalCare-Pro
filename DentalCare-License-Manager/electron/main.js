const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const LicenseGenerator =
require("../shared/LicenseGenerator.cjs");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1200,

        height: 800,

        minWidth: 1100,

        minHeight: 700,

        autoHideMenuBar: true,

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            contextIsolation: true,

            nodeIntegration: false

        }

    });

    if (app.isPackaged) {

        mainWindow.loadFile(

            path.join(
                __dirname,
                "../dist/index.html"
            )

        );

    }

    else {

        mainWindow.loadURL("http://localhost:5173");

    }

}

app.whenReady().then(() => {

    createWindow();

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});

ipcMain.handle(

    "save-license",

    async (event, license) => {

        try {

            const result = await dialog.showSaveDialog({

                title: "Guardar licencia",

                defaultPath: "license.dat",

                filters: [

                    {

                        name: "Licencia",

                        extensions: ["dat"]

                    }

                ]

            });

            if (result.canceled) {

                return {

                    success: false,

                    canceled: true

                };

            }

            fs.writeFileSync(

                result.filePath,

                JSON.stringify(

                    license,

                    null,

                    4

                )

            );

            return {

                success: true

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                message: error.message

            };

        }

    }

);

ipcMain.handle(

    "generate-license",

    async (event, data) => {

        try {

            const license = LicenseGenerator.generate(data);

            return {

                success: true,

                license

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                message: error.message

            };

        }

    }

);
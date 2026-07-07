const {
    app,
    BrowserWindow,
    ipcMain,
     dialog
} = require("electron");
const path = require("path");
const fs = require("fs");
const BackendService = require("./src/services/BackendService");
const WindowService = require("./src/services/WindowService");
const WaitForBackendService =
require("./src/services/WaitForBackendService");
const SplashScreenService = require("./src/services/SplashScreenService");
const MachineService = require("./src/services/MachineService");
const LicenseService = require("./src/services/LicenseService");
const ActivationService = require("./src/services/ActivationService");

const isDev = !app.isPackaged

ipcMain.handle(

    "get-machine-id",

    async () => {

        return await MachineService.getMachineId();

    }

);

ipcMain.handle(

    "select-license",

    async () => {

        const result = await dialog.showOpenDialog({

            title: "Seleccione su licencia",

            properties: [

                "openFile"

            ],

            filters: [

                {

                    name: "Licencia",

                    extensions: [

                        "dat"

                    ]

                }

            ]

        });

        if (result.canceled) {

            return {

                success: false,

                canceled: true

            };

        }

        try {

            const sourceFile = result.filePaths[0];

           const destinationFile = app.isPackaged

    ? path.join(

        process.resourcesPath,

        "publish",

        "license",

        "license.dat"

      )

    : path.join(

        __dirname,

        "../license/license.dat"

      );

            fs.copyFileSync(

                sourceFile,

                destinationFile

            );

            const validation =

                await LicenseService.validate();

            if (!validation.valid) {

                return {

                    success: false,

                    reason: validation.reason

                };

            }

            return {

                success: true,

                license: validation.data

            };

        }

        catch (error) {

            console.error(error);

            return {

                success: false,

                reason: "UNKNOWN_ERROR"

            };

        }

    }

);

ipcMain.handle(

    "activate-system",

    async () => {

        return await ActivationService.activate(isDev);

    }

);

app.whenReady().then(async () => {

    SplashScreenService.create();

    try {

        BackendService.start();

        await WaitForBackendService.wait();

        // Tiempo mínimo del Splash
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        const validation = await LicenseService.validate();

        if (validation.valid) {

            WindowService.createMainWindow(
                isDev,
                "/"
            );

        } else {

            WindowService.createMainWindow(
                isDev,
                "/activation"
            );

        }

        SplashScreenService.close();

    } catch (error) {

        console.error(error);

        SplashScreenService.close();

        app.quit();

    }

});

app.on("window-all-closed", () => {

    BackendService.stop();

    if (process.platform !== "darwin") {

        app.quit();

    }

});
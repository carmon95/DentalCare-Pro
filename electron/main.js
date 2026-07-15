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
const BootManager = require("./src/services/BootManager");
const MySQLDetectionService = require("./src/services/MySQLDetectionService");
const ConfigService = require("./src/services/ConfigService");
const DatabaseSetupService = require("./src/services/DatabaseSetupService");


const isDev = !app.isPackaged

app.setName("DentalCare Pro");
app.setAppUserModelId("com.dentalcare.pro");

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

       const destinationFile = path.join(

    app.getPath("userData"),

    "license.dat"

);

            fs.copyFileSync(

                sourceFile,

                destinationFile

            );
            console.log("Licencia copiada en:");

console.log(destinationFile);

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


ipcMain.handle(

    "mysql-installed",

    async () => {

        return await MySQLDetectionService.isInstalled();

    }

);

ipcMain.handle(

    "get-initial-route",

    async () => {

        return await BootManager.getInitialRoute();

    }

);

ipcMain.handle(

    "prepare-system",

    async (event, config) => {

        return await DatabaseSetupService.install(

    config,

    (progress, message) => {

        event.sender.send(

            "setup-progress",

            {

                progress,

                message

            }

        );

    }

);

    }

);

app.disableHardwareAcceleration();

app.whenReady().then(async () => {

    SplashScreenService.create();

    try {

        BackendService.start();

        await WaitForBackendService.wait();

        // Tiempo mínimo del Splash
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

       const initialRoute =

    await BootManager.getInitialRoute();

WindowService.createMainWindow(

    isDev,

    initialRoute

);

//WindowService.getMainWindow().webContents.openDevTools();

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
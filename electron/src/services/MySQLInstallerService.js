const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");


const MySQLConfig = require("../config/MySQLConfig");

class MySQLInstallerService {


   async isInstalled() {

    return new Promise((resolve) => {

        exec(

            `sc query ${MySQLConfig.SERVICE_NAME}`,

            (error, stdout, stderr) => {

                if (error) {

                    resolve(false);
                    return;

                }

                const output =
                    `${stdout}\n${stderr}`.toLowerCase();

                if (

                    output.includes("does not exist") ||

                    output.includes("1060")

                ) {

                    resolve(false);
                    return;

                }

                resolve(true);

            }

        );

    });

}

    getInstallerPath() {

    return path.join(

        process.resourcesPath,

        "mysql",

        MySQLConfig.INSTALLER_FILE

    );

}

   findInstallerConsole() {

    for (const installerPath of MySQLConfig.INSTALLER_CONSOLE_PATHS) {

        if (fs.existsSync(installerPath)) {

            return installerPath;

        }

    }

    return null;

}

async installInstaller() {

    const installer = this.getInstallerPath();

    if (!fs.existsSync(installer)) {

        throw new Error(

            "No se encontró el instalador de MySQL."

        );

    }

    return new Promise((resolve, reject) => {

        const command =

            `msiexec /i "${installer}" /qn`;

        console.log(command);

        exec(

            command,

            {

                windowsHide: true

            },

            (error) => {

                if (error) {

                    reject(error);

                    return;

                }

                resolve();

            }

        );

    });

}

async waitInstallerReady() {

    return new Promise((resolve, reject) => {

        let attempts = 0;

        const timer = setInterval(() => {

            const installer = this.findInstallerConsole();

            if (installer) {

                clearInterval(timer);

                resolve(installer);

                return;

            }

            attempts++;

            if (attempts >= 60) {

                clearInterval(timer);

                reject(

                    new Error(

                        "MySQL Installer no terminó de instalarse."

                    )

                );

            }

        }, 1000);

    });

}

async waitInstallerAvailable() {

    return new Promise((resolve, reject) => {

        let attempts = 0;

        const timer = setInterval(() => {

            const installerConsole =
                this.findInstallerConsole();

            if (!installerConsole) {

                attempts++;

                return;

            }

            exec(

                `"${installerConsole}" status`,

                (error) => {

                    if (!error) {

                        clearInterval(timer);

                        resolve();

                        return;

                    }

                }

            );

            attempts++;

            if (attempts >= 60) {

                clearInterval(timer);

                reject(

                    new Error(

                        "MySQL Installer no está disponible."

                    )

                );

            }

        }, 1000);

    });

}

async installServer(config) {

    const installerConsole = this.findInstallerConsole();

    if (!installerConsole) {

        throw new Error(

            "No se encontró MySQLInstallerConsole.exe"

        );

    }

    return new Promise((resolve, reject) => {

        const command =

            `"${installerConsole}" ` +

            `--install server;${MySQLConfig.VERSION}:*:` +

            `password=${config.password};` +

            `port=${config.port};` +

            `windows_service_name=${MySQLConfig.SERVICE_NAME} ` +

            `--silent`;

        console.log(command);

        exec(

            command,

            {

                windowsHide: true

            },

            (error, stdout, stderr) => {

                if (error) {

                    console.error(stderr);

                    reject(error);

                    return;

                }

                console.log(stdout);

                resolve();

            }

        );

    });

}

async waitServiceReady() {

    return new Promise((resolve, reject) => {

        let attempts = 0;

        const timer = setInterval(() => {

            exec(

                `sc query ${MySQLConfig.SERVICE_NAME}`,

                (error, stdout) => {

                    if (

                        !error &&

                        stdout.includes("RUNNING")

                    ) {

                        clearInterval(timer);

                        resolve();

                        return;

                    }

                }

            );

            attempts++;

            if (attempts >= 60) {

                clearInterval(timer);

                reject(

                    new Error(

                        "MySQL no inició correctamente."

                    )

                );

            }

        }, 1000);

    });

}

async prepare(config, sendProgress) {

    sendProgress(
        5,
        "Verificando MySQL..."
    );

    const installed =
        await this.isInstalled();

    if (!installed) {

        sendProgress(
            10,
            "Instalando MySQL Installer..."
        );

        await this.installInstaller();

        sendProgress(
            25,
            "Preparando instalador..."
        );

        await this.waitInstallerReady();

        await this.waitInstallerAvailable();

        sendProgress(
            45,
            "Instalando MySQL Server..."
        );

        await this.installServer(config);

    }

    sendProgress(
        60,
        "Iniciando servicio MySQL..."
    );

    await this.startService();

    sendProgress(
        75,
        "Verificando servicio..."
    );

    await this.waitServiceReady();

}

  async startService() {

    return new Promise((resolve, reject) => {

        exec(

            `sc start ${MySQLConfig.SERVICE_NAME}`,

            (error, stdout, stderr) => {

                if (!error) {

                    resolve();
                    return;

                }

                const output =
                    `${stdout}\n${stderr}`.toLowerCase();

                if (

                    output.includes("already running") ||

                    output.includes("ya se inició") ||

                    output.includes("1060") ||

                    output.includes("1056")

                ) {

                    resolve();
                    return;

                }

                reject(error);

            }

        );

    });

}

    async stopService() {

        return new Promise((resolve, reject) => {

            exec(

               `sc stop ${MySQLConfig.SERVICE_NAME}`,

                (error) => {

                    if (error) {

                        reject(error);
                        return;

                    }

                    resolve();

                }

            );

        });

    }

}

module.exports = new MySQLInstallerService();
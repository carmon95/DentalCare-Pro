const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const ConfigService = require("./ConfigService");
const MySQLInstallerService = require("./MySQLInstallerService");
const ErrorTranslatorService =require("./ErrorTranslatorService");
const LoggerService =require("./LoggerService");

class DatabaseSetupService {

    async testConnection(config) {

        console.log("CONFIG RECIBIDA:", config);

        const connection = await mysql.createConnection({

            host: config.host,

            port: config.port,

            user: config.user,

            password: config.password

        });

        await connection.end();

        return true;

    }

    async createDatabase(config) {

        const connection = await mysql.createConnection({

            host: config.host,

            port: config.port,

            user: config.user,

            password: config.password

        });

        await connection.query(

            `CREATE DATABASE IF NOT EXISTS \`${config.database}\``

        );

        await connection.end();

    }

    async executeSqlFile(config, filePath) {

        const sql = fs.readFileSync(

            filePath,

            "utf8"

        );

        const connection = await mysql.createConnection({

            host: config.host,

            port: config.port,

            user: config.user,

            password: config.password,

            database: config.database,

            multipleStatements: true

        });

        await connection.query(sql);

        await connection.end();

    }

   async importSchema(config) {

    const { app } = require("electron");

    const schemaPath = app.isPackaged

        ? path.join(

            process.resourcesPath,

            "publish",

            "database",

            "schema.sql"

        )

        : path.join(

            __dirname,

            "../../../publish/database/schema.sql"

        );

    await this.executeSqlFile(

        config,

        schemaPath

    );

}

async importSeed(config) {

    const { app } = require("electron");

    const seedPath = app.isPackaged

        ? path.join(

            process.resourcesPath,

            "publish",

            "database",

            "seed.sql"

        )

        : path.join(

            __dirname,

            "../../../publish/database/seed.sql"

        );

    await this.executeSqlFile(

        config,

        seedPath

    );

}

    async saveConfiguration(config) {

        ConfigService.save(config);

    }

async install(config, sendProgress) {

    LoggerService.clear();

    LoggerService.info(

    "Inicio del asistente de instalación."

);

    try {

        await MySQLInstallerService.prepare(

            config,

            sendProgress

        );

        sendProgress(

            80,

            "Verificando conexión con MySQL..."

        );

        LoggerService.info(
    "Verificando conexión con MySQL."
);

        await this.testConnection(config);

        LoggerService.info(
    "Conexión con MySQL establecida."
);

        sendProgress(

            85,

            "Creando base de datos..."

        );

        LoggerService.info(
    `Creando base de datos '${config.database}'.`
);

        await this.createDatabase(config);

        LoggerService.info(
    "Base de datos creada correctamente."
);

        sendProgress(

            90,

            "Importando estructura de tablas..."

        );

        LoggerService.info(
    "Importando schema.sql."
);

        await this.importSchema(config);

        LoggerService.info(
    "Schema importado correctamente."
);

        sendProgress(

            95,

            "Importando datos iniciales..."

        );

        LoggerService.info(
    "Importando seed.sql."
);

        await this.importSeed(config);

        LoggerService.info(
    "Datos iniciales importados."
);

        sendProgress(

            98,

            "Guardando configuración..."

        );

        LoggerService.info(
    "Guardando configuración."
);

        await this.saveConfiguration(config);

        LoggerService.info(
    "Configuración guardada correctamente."
);

        sendProgress(

            100,

            "Sistema preparado correctamente."

        );

        await new Promise(

            resolve => setTimeout(

                resolve,

                500

            )

        );

        LoggerService.info(
    "Instalación finalizada correctamente."
);

        return {

            success: true

        };

    }

catch(error){

    console.error(error);

    LoggerService.error(
        error.stack || error.message
    );

    return{

        success:false,

        message:
        ErrorTranslatorService.translate(error)

    };

}
}

}

module.exports = new DatabaseSetupService();
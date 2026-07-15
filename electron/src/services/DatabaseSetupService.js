const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const ConfigService = require("./ConfigService");
const MySQLInstallerService = require("./MySQLInstallerService");
const ErrorTranslatorService =require("./ErrorTranslatorService");

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

    try {

        await MySQLInstallerService.prepare(

            config,

            sendProgress

        );

        sendProgress(

            80,

            "Verificando conexión con MySQL..."

        );

        await this.testConnection(config);

        sendProgress(

            85,

            "Creando base de datos..."

        );

        await this.createDatabase(config);

        sendProgress(

            90,

            "Importando estructura de tablas..."

        );

        await this.importSchema(config);

        sendProgress(

            95,

            "Importando datos iniciales..."

        );

        await this.importSeed(config);

        sendProgress(

            98,

            "Guardando configuración..."

        );

        await this.saveConfiguration(config);

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

        return {

            success: true

        };

    }

    catch(error){

    console.error(error);

    return{

        success:false,

        message:

        ErrorTranslatorService.translate(error)

    };

}

}

}

module.exports = new DatabaseSetupService();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const { app } = require("electron");

class DatabaseInstallerService {

    async testConnection(config) {

        try {

            const connection = await mysql.createConnection({

                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password

            });

            await connection.end();

            return {

                success: true

            };

        }

        catch (error) {

            return {

                success: false,
                message: error.message

            };

        }

    }

    async initialize(config) {

        const connection = await mysql.createConnection({

            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            multipleStatements: true

        });

        // Eliminar la BD si existe

        await connection.query(

            `DROP DATABASE IF EXISTS ${config.database}`

        );

        // Crear nuevamente

        await connection.query(

            `CREATE DATABASE ${config.database}
             CHARACTER SET utf8mb4
             COLLATE utf8mb4_unicode_ci`

        );

        // Seleccionar BD

        await connection.query(

            `USE ${config.database}`

        );

        // Leer schema

        const schemaPath = app.isPackaged

            ? path.join(

                process.resourcesPath,

                "publish",

                "database",

                "schema.sql"

            )

            : path.join(

                __dirname,

                "../../../database/schema.sql"

            );

        const schema = fs.readFileSync(

            schemaPath,

            "utf8"

        );

        // Ejecutar schema

        await connection.query(schema);

        /*
        ==============================
        PRUEBA: DESACTIVAR SEED.SQL
        ==============================
        */

        const seedPath = app.isPackaged

            ? path.join(

                process.resourcesPath,

                "publish",

                "database",

                "seed.sql"

            )

            : path.join(

                __dirname,

                "../../../database/seed.sql"

            );

        const seed = fs.readFileSync(

            seedPath,

            "utf8"

        );

        await connection.query(seed);
        

        await connection.end();

        return {

            success: true

        };

    }

}

module.exports = new DatabaseInstallerService();
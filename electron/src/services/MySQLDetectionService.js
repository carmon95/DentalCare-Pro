const { exec } = require("child_process");

class MySQLDetectionService {

    async isInstalled() {

        return new Promise((resolve) => {

            exec(

                'sc query type= service',

                (error, stdout) => {

                    if (error) {

                        resolve(false);

                        return;

                    }

                    const installed =
                        stdout.toLowerCase().includes("mysql");

                    resolve(installed);

                }

            );

        });

    }

}

module.exports = new MySQLDetectionService();
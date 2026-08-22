const http = require("http");

class WaitForBackendService {

    async wait(

        url = "http://localhost:3001",

        timeout = 30000,

        interval = 500

    ) {

        const start = Date.now();

        while (

            Date.now() - start < timeout

        ) {

            try {

                await this.check(url);

                return true;

            }

            catch {

                await new Promise(

                    resolve =>

                        setTimeout(

                            resolve,

                            interval

                        )

                );

            }

        }

        throw new Error(

            "El Backend no respondió."

        );

    }

    check(url) {

        return new Promise(

            (

                resolve,

                reject

            ) => {

                http

                    .get(

                        url,

                        (res) => {

                            resolve();

                        }

                    )

                    .on(

                        "error",

                        reject

                    );

            }

        );

    }

}

module.exports = new WaitForBackendService();
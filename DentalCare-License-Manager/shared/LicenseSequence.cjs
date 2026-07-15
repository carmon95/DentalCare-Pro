const fs = require("fs");
const path = require("path");

class LicenseSequence {

    constructor() {

        this.file = path.join(

            __dirname,

            "../output/license-sequence.json"

        );

    }

    next() {

        if (!fs.existsSync(path.dirname(this.file))) {

            fs.mkdirSync(path.dirname(this.file), {

                recursive: true

            });

        }

        let current = 0;

        if (fs.existsSync(this.file)) {

            current = JSON.parse(

                fs.readFileSync(

                    this.file,

                    "utf8"

                )

            ).last;

        }

        current++;

        fs.writeFileSync(

            this.file,

            JSON.stringify(

                {

                    last: current

                },

                null,

                4

            )

        );

        return `DCP-${String(current).padStart(6, "0")}`;

    }

}

module.exports = new LicenseSequence();
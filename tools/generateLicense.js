const fs = require("fs");
const path = require("path");

const CryptoService = require(
    "../electron/src/services/CryptoService"
);

const license = {

    licenseId:

        "DCP-000001",

    clinic:

        "Clínica Demo",

    owner:

        "Carlos Montalván",

    edition:

        "Professional",

    version:

        "1.0",

    machineId:

    "14EA8957B84F841CD0281AF60772A5F1961D2520E94136F095BEC5047ECAF9A4",

    issuedAt:

        new Date().toISOString(),

    expiresAt:

        null

};

const signature =

    CryptoService.sign(

        license

    );

const finalLicense = {

    ...license,

    signature

};

const output = path.join(

    __dirname,

    "../license/license.dat"

);

fs.writeFileSync(

    output,

    JSON.stringify(

        finalLicense,

        null,

        4

    )

);

console.log(

    "Licencia generada."

);
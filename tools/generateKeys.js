const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const { publicKey, privateKey } = crypto.generateKeyPairSync(

    "rsa",

    {

        modulusLength: 4096,

        publicKeyEncoding: {

            type: "spki",

            format: "pem"

        },

        privateKeyEncoding: {

            type: "pkcs8",

            format: "pem"

        }

    }

);

const privateDir = path.join(
    __dirname,
    "../license/private"
);

const publicDir = path.join(
    __dirname,
    "../license/public"
);

if (!fs.existsSync(privateDir))
    fs.mkdirSync(privateDir, { recursive: true });

if (!fs.existsSync(publicDir))
    fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(
    path.join(privateDir, "private.pem"),
    privateKey
);

fs.writeFileSync(
    path.join(publicDir, "public.pem"),
    publicKey
);

console.log("==================================");
console.log(" Claves RSA generadas");
console.log("==================================");
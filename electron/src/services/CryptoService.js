const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

class CryptoService {

    sign(data) {

        const privateKey = fs.readFileSync(

            path.join(

                __dirname,

                "../../../license/private/private.pem"

            ),

            "utf8"

        );

        const signer = crypto.createSign(

            "RSA-SHA256"

        );

        signer.update(

            JSON.stringify(data)

        );

        signer.end();

        return signer.sign(

            privateKey,

            "base64"

        );

    }

    verify(

        data,

        signature

    ) {

        const publicKey = fs.readFileSync(

            path.join(

                __dirname,

                "../../../license/public/public.pem"

            ),

            "utf8"

        );

        const verifier = crypto.createVerify(

            "RSA-SHA256"

        );

        verifier.update(

            JSON.stringify(data)

        );

        verifier.end();

        return verifier.verify(

            publicKey,

            signature,

            "base64"

        );

    }

}

module.exports = new CryptoService();
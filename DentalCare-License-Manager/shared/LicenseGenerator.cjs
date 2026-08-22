const CryptoService =
require("./CryptoService.cjs");

const LicenseSequence =
require("./LicenseSequence.cjs");

class LicenseGenerator {

    generate(data) {

        const license = {

            licenseId: LicenseSequence.next(),

            clinic: data.clinic,

            owner: data.owner,

            edition: data.edition,

            version: data.version,

            machineId: data.machineId,

            issuedAt: new Date().toISOString(),

            expiresAt: data.expiresAt || null

        };

        const signature = CryptoService.sign(license);

        return {

            ...license,

            signature

        };

    }

}

module.exports = new LicenseGenerator();
const LicenseService = require(

    "./src/services/LicenseService"

);

(async()=>{

    const result=

    await LicenseService.validate();

    console.log(result);

})();
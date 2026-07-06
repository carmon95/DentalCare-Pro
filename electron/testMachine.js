const MachineService = require("./src/services/MachineService");

(async () => {

    const id = await MachineService.getMachineId();

    console.log("\nMachine ID:\n");

    console.log(id);

})();
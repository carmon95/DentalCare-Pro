const {

    contextBridge,

    ipcRenderer

} = require("electron");

contextBridge.exposeInMainWorld(

    "electronAPI",

    {

        getMachineId: () =>

            ipcRenderer.invoke(

                "get-machine-id"

            ),

        selectLicense: () =>

            ipcRenderer.invoke(

                "select-license"

            ),
          activateSystem: () =>
            ipcRenderer.invoke("activate-system")  

    }

);
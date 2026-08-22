const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(

    "electronAPI",

    {

        generateLicense: (data) =>

            ipcRenderer.invoke(

                "generate-license",

                data

            ),

        saveLicense: (license) =>

            ipcRenderer.invoke(

                "save-license",

                license

            )

    }

);
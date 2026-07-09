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
            ipcRenderer.invoke("activate-system"),


           testDatabaseConnection: (config) =>

            ipcRenderer.invoke(

                "test-db-connection",

                config

            ),

            initializeDatabase: (config) =>

            ipcRenderer.invoke(

            "initialize-database",

        config

    ),

    mysqlInstalled: () =>

    ipcRenderer.invoke(

        "mysql-installed"

    ),

    saveConfig: (config) =>

    ipcRenderer.invoke(

        "save-config",

        config

    ),

    getInitialRoute: () =>

    ipcRenderer.invoke(

        "get-initial-route"

    )

    }

);
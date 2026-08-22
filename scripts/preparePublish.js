const fs = require("fs-extra");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const publishPath = path.join(ROOT, "publish");

async function prepare() {

    console.log("Preparando carpeta publish...");

    await fs.emptyDir(publishPath);

    // Backend
    await fs.copy(
        path.join(ROOT, "backend"),
        path.join(publishPath, "backend")
    );

    // Runtime de Node

await fs.copy(
    path.join(ROOT, "runtime"),
    path.join(publishPath, "runtime")
);

    // Frontend compilado
    await fs.copy(
        path.join(ROOT, "frontend", "dist"),
        path.join(publishPath, "frontend")
    );

    // Database

await fs.copy(

    path.join(ROOT, "database"),

    path.join(publishPath, "database")

);

    // Licencia

await fs.ensureDir(
    path.join(publishPath, "license")
);

await fs.copy(
    path.join(ROOT, "license", "public"),
    path.join(publishPath, "license", "public")
);
   

    console.log("Publish preparado correctamente.");

}

prepare().catch(console.error);
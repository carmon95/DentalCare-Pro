class ErrorTranslatorService {

    translate(error) {

        const message =

            error?.message || "";

        if (

            message.includes("ER_ACCESS_DENIED_ERROR")

        ) {

            return "La contraseña del usuario MySQL es incorrecta.";

        }

        if (

            message.includes("ECONNREFUSED")

        ) {

            return "No fue posible conectarse al servidor MySQL.";

        }

        if (

            message.includes("ETIMEDOUT")

        ) {

            return "El servidor MySQL tardó demasiado en responder.";

        }

        if (

            message.includes("Unknown database")

        ) {

            return "La base de datos especificada no existe.";

        }

        if (

            message.includes("ER_BAD_DB_ERROR")

        ) {

            return "La base de datos no fue encontrada.";

        }

        if (

            message.includes("ENOENT")

        ) {

            return "No se encontró un archivo requerido para la instalación.";

        }

        if (

            message.includes("SERVICE_DOES_NOT_EXIST")

        ) {

            return "El servicio de MySQL no fue encontrado.";

        }

        return message;

    }

}

module.exports = new ErrorTranslatorService();
import c from "config"
import debug from "debug"

export default function checkConfigurations() {
    if (!c.get("port")) {
        debug("error")("The port number is not found in the configurations");
        process.exit(2);
    }
    if (!c.get("database.connectionString")) {
        debug("error")("The connection string for the database is not found in the configurations");
        process.exit(4);
    }
}
import { Application } from "express";
import c from "config";
import debug from "debug";

const HOST = "0.0.0.0";

export default function bindNetwork(app: Application) {
    try {
        let applicationPort = parseInt(c.get("port")) || 4050;
        app.listen(applicationPort, HOST, () => {
            console.log(`The application listen on port ${applicationPort}`);
        });
    }
    catch (e) {
        debug("error")(`The application is not bounded successfully. the error is ${e}`);
        process.exit(5);
    }

}
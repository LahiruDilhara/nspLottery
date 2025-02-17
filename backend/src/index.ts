import express, { Application } from "express";
import c from "config";
import configRoutes from "./startups/routes";
import checkConfigurations from "./startups/config";
import configDatabase from "./startups/database";
import bindNetwork from "./startups/bindApp";
import init from "./business/initialize";

async function main() {
    // create the express application
    const app: Application = express();

    // check for the configurations. if the configurations are not setuped, this will stop the application.
    checkConfigurations();

    // setup the database and connect with the mongodb database.
    await configDatabase();

    // configure all middlware routes
    configRoutes(app);

    // configure the business logic
    init();

    // configure the server and the port number
    bindNetwork(app);
}

main();

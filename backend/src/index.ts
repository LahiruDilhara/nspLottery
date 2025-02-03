import express, { Application } from "express";
import c from "config";
import configRoutes from "./startups/routes";

// create the express application
const app: Application = express();

// configure all middlware routes
configRoutes(app);

// configure the server and the port number
const PORT = 4080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`The application listen on port ${PORT}`);
});
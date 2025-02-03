import express, { Application } from 'express';
import helmet from 'helmet';
import cors from "cors";
import morgan from 'morgan';
import testRouter from '../routes/test';
import resultRouter from '../routes/result';


export default function configRoutes(app: Application) {
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(morgan("combined"));

    // config the routes
    app.use("/api/v1/test", testRouter);
    app.use("/api/v1/result", resultRouter);
}

import express, { Application } from 'express';
import helmet from 'helmet';
import cors from "cors";
import morgan from 'morgan';
import resultRouter from '../presentation/routes/result';


export default function configRoutes(app: Application) {
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(morgan("combined"));

    // config the routes
    app.use("/api/v1/result", resultRouter);
}

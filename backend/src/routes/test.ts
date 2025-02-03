import express from "express";

const testRouter = express.Router();

testRouter.get("/", async (request: express.Request, response: express.Response) => {
    console.log("the route is called");
    response.send("Hello world");
})

export default testRouter;
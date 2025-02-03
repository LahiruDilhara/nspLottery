import express from "express";
import CheckResult from "../usecase/checkResultsUseCase";

const resultRouter = express.Router();

resultRouter.post("/", async (request: express.Request, response: express.Response) => {
    let data = request.body;
    let result = CheckResult(data.data)
    response.send(result);
})

export default resultRouter;
import express from "express";
import CheckResultFromLotteryString, { CheckResultFromQR } from "../../business/usecase/checkResultsUseCase";
import ErrorDto from "../dto/error/errorDto";
import ResultRepository from "../../data/repositories/ResultRepository";

const resultRouter = express.Router();

resultRouter.post("/qr", async (request: express.Request, response: express.Response) => {
    let data = request.body;
    try {
        let result = await CheckResultFromQR(data.data, new ResultRepository());
        response.send(result);
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            response.send(new ErrorDto(e.message));
        }
        else {
            response.send(new ErrorDto(`UnRecognized Error ${e}`));
        }
    }
})

export default resultRouter;
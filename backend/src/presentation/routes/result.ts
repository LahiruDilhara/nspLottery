import express from "express";
import CheckResultFromLotteryString from "../../business/usecase/checkResultsUseCase";
import ErrorDto from "../dto/error/errorDto";

const resultRouter = express.Router();

resultRouter.post("/", async (request: express.Request, response: express.Response) => {
    let data = request.body;
    try {
        let result = await CheckResultFromLotteryString(data.data)
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
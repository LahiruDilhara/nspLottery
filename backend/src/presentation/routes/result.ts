import express from "express";
import ErrorDto from "../dto/error/errorDto";
import ResultRepository from "../../data/repositories/ResultRepository";
import { CheckResultFromQR } from "../../business/usecase/checkResultsUseCase";
import QrDto, { validateCheckQrDto } from "../dto/result/checkQrDto";
import ResultMapper from "../mappers/resultMapper";

const resultRouter = express.Router();

resultRouter.post("/qr", async (request: express.Request, response: express.Response) => {

    const { error } = validateCheckQrDto(request.body);

    if (error) {
        response.status(ErrorDto.statusCodes.invalidRouteParameter).send(ErrorDto.errorMessageFromJoi(error));
        return;
    }

    let qrDto: QrDto = ResultMapper.ToQrDto(request.body);

    try {
        let result = await CheckResultFromQR(qrDto.qr, new ResultRepository());
        response.send(result);
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            response.send(new ErrorDto(e.message));
            return;
        }
        else {
            response.send(new ErrorDto(`UnRecognized Error "${e}"`));
            return;
        }
    }
})

export default resultRouter;
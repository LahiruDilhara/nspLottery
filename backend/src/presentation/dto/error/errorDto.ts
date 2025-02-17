import Joi from "joi";

class ErrorDto {
    static statusCodes = {
        invalidRouteParameter: 400
    }

    static errorMessageFromJoi(error: Joi.ValidationError): ErrorDto {
        let errorMessage: string = error.details.map(detail => detail.message.replace(/\"/g, "'")).join(" , ").toString();
        return new ErrorDto(errorMessage);
    }
    constructor(
        public error: string,
    ) { }
}

export default ErrorDto;
import Joi from "joi";

export default class QrDto {
    qr!: string;
}

export function validateCheckQrDto(checkQrDto: QrDto): Joi.ValidationResult {
    const schema = Joi.object({
        qr: Joi.string().required().min(5)
    })

    return schema.validate(checkQrDto);
}
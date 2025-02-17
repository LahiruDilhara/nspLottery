import QrDto from "../dto/result/checkQrDto";

export default class ResultMapper {
    static ToQrDto(data: any): QrDto {
        return {
            qr: data.qr
        }
    }
}
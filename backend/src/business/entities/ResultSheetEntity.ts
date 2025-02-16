import { QRIndexes, Result } from "../types/types";

export default class ResultSheetEntity {
    date!: Date;
    name!: string;
    qrIndexes!: QRIndexes
    results!: Result
}
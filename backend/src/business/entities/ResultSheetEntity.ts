export default class ResultSheetEntity {
    date!: Date;
    name!: string;
    qrIndexes!: QRIndexes
    results!: {
        numbers: string[];
        symboles: string[];
        prizes: number[]
        specialSymboles: { category: string, method: string, results: string[], gift: string, description: string }[];
    };

}
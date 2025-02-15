export default class ResultSheetEntity {
    date!: Date;
    name!: string;
    qrIndexes!: {
        tokensLength: number;
        drawNo: number;
        barCode: number;
        numbers: number[];
        symboles: number[];
        specialSymboles: { category: string, indexes: number[] }[];
    };
    results!: {
        numbers: string[];
        symboles: string[];
        prizes: number[]
        specialSymboles: { category: string, method: string, results: string[], gift: string, description: string }[];
    };

}
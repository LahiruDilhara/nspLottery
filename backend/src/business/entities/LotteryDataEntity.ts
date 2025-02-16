export default class LotteryDataEntity {
    numbers!: string[];
    symboles!: string[];
    drawNo!: string;
    barcode!: string;
    specialSymboles!: { category: string, symboles: string[]}[];
}
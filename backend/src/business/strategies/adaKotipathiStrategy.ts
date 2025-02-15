import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryEnitity from "../entities/LotteryEntity";
import ResultSheetEntity from "../entities/ResultSheetEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class AdaKotipathiStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Ada Kotipathi";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDate(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.numbers = tokens.slice(5, 9);
        lottery.symbole = tokens[9];
        lottery.specialSymboles = tokens.slice(10);
        console.log(tokens);

        return lottery;
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

    toString(): string {
        return "Ada Kotipathi";
    }

    parseQRTokens(tokens: string[], resultSheet: ResultSheetEntity): LotteryDataEntity {
        return {
            barcode: tokens[resultSheet.qrIndexes.barCode],
            drawNo: tokens[resultSheet.qrIndexes.drawNo],
            numbers: resultSheet.qrIndexes.numbers.map(numberIndex => tokens[numberIndex]),
            symboles: resultSheet.qrIndexes.symboles.map(symboleIndex => tokens[symboleIndex]),
            specialSymboles: resultSheet.qrIndexes.specialSymboles.map((specialSymbole => ({ category: specialSymbole.category, symboles: specialSymbole.indexes.map(specialSymboleIndex => tokens[specialSymboleIndex]) })))
        }
    }
}
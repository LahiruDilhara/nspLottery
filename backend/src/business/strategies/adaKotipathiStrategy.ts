import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import LotteryDataEntity from "../entities/LotteryDataEntity";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";

export default class AdaKotipathiStrategy extends ILotteryStrategy {

    toString(): string {
        return "Ada Kotipathi";
    }

    parseQRTokens(tokens: string[], qrIndexes: QRIndexes): LotteryDataEntity {
        return {
            barcode: tokens[qrIndexes.barCode],
            drawNo: tokens[qrIndexes.drawNo],
            numbers: qrIndexes.numbers.map(numberIndex => tokens[numberIndex]),
            symboles: qrIndexes.symboles.map(symboleIndex => tokens[symboleIndex]),
            specialSymboles: qrIndexes.specialSymboles.map((specialSymbole => ({ category: specialSymbole.category, symboles: specialSymbole.indexes.map(specialSymboleIndex => tokens[specialSymboleIndex]) })))
        }
    }

    // before calling this method should validate the response for the required data.
    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity {

        // get the maching main numbers which are formatted in correct order
        let machedMainNumbers: { number: string, matched: boolean }[] = this.matchMainNumbers(result.numbers, lotteryData.numbers);

        // get the maching symboles which are formatted in correct order
        let machedSymboles: { symbole: string, matched: boolean }[] = this.matchSymboles(result.symboles, lotteryData.symboles);

        // get the maching special symboles which are formatted in correct order
        let machedSpecialSymboles: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        // calculate the maching main number count
        let machingMainNumberCount = (machedMainNumbers.filter(mainNumber => mainNumber.matched === true)).length;

        // calculate the main prize for the ada kotipathi lottery
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machingMainNumberCount, machedSymboles[0].matched);

        // matched specialSymbolesCategoryCount
        let machedSpecialSymbolesCategoryCount = (machedSpecialSymboles.filter(matchedSpecialSymbole => matchedSpecialSymbole.matched === true)).length;

        return {
            totalWinMainPrice: totalWinMainPrize,
            matchedCategoryCount: machedSpecialSymbolesCategoryCount,
            matchedMainNumbers: machedMainNumbers,
            matchedMainSymboles: machedSymboles,
            matchedSpecialSymboles: machedSpecialSymboles,
        }
    }


    calculateMainPrize(prizes: number[], matchNumberCount: number, symboleMatched: boolean): number {
        if (matchNumberCount === 4 && symboleMatched) return prizes[0]
        else if (matchNumberCount === 4) return prizes[1]
        else if (matchNumberCount === 3 && symboleMatched) return prizes[2]
        else if (matchNumberCount === 3) return prizes[3]
        else if (matchNumberCount === 2 && symboleMatched) return prizes[4]
        else if (matchNumberCount === 2) return prizes[5]
        else if (matchNumberCount === 1 && symboleMatched) return prizes[6]
        else if (matchNumberCount === 1) return prizes[7]
        else if (symboleMatched) return prizes[8]
        else return 0
    }
}

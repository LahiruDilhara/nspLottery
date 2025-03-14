import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import LotteryDataEntity from "../entities/LotteryDataEntity";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";
import ResultMatcher from "./ResultMatcher";

export default class SasiriStrategy extends ResultMatcher implements ILotteryStrategy {
    toString(): string {
        return "sasiri";
    }

    formatDate(dateString: string): Date {
        let [year, month, day] = dateString.split(".");
        let formattedDate = `${year}-${month}-${day}`;
        return new Date(formattedDate);
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
        let machedMainNumbers = this.matchAllAnyOrderDescrete(result.numbers, lotteryData.numbers);

        // get the maching symboles which are formatted in correct order
        let machedSymboles = this.matchAllAnyOrderDescrete(result.symboles, lotteryData.symboles);

        // get the maching special symboles which are formatted in correct order
        let machedSpecialSymboles: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        // calculate the main prize for the ada kotipathi lottery
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machedMainNumbers.matchCount);

        // matched specialSymbolesCategoryCount
        let machedSpecialSymbolesCategoryCount = (machedSpecialSymboles.filter(matchedSpecialSymbole => matchedSpecialSymbole.matched === true)).length;

        return {
            totalWinMainPrice: totalWinMainPrize,
            matchedCategoryCount: machedSpecialSymbolesCategoryCount,
            matchedMainNumbers: machedMainNumbers.matchStatus,
            matchedMainSymboles: machedSymboles.matchStatus,
            matchedSpecialSymboles: machedSpecialSymboles,
        }
    }

    calculateMainPrize(prizes: number[], matchNumberCount: number): number {
        if (matchNumberCount === 3) return prizes[0];
        else if (matchNumberCount === 2) return prizes[1];
        else if (matchNumberCount === 1) return prizes[2];
        return 0
    }
}
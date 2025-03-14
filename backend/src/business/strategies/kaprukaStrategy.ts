import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";
import ResultMatcher from "./ResultMatcher";

export default class KaprukaStrategy extends ResultMatcher implements ILotteryStrategy {


    toString(): string {
        return "kapruka";
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
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machedMainNumbers.matchCount, machedSymboles.matchStatus);

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


    calculateMainPrize(prizes: number[], matchNumberCount: number, matchSymboles: { symbole: string, matched: boolean }[]): number {
        let mainPrize = 0;
        let englishLetterMached = matchSymboles[0].matched;
        let superNumberMached = matchSymboles[1].matched;
        if (matchNumberCount === 4 && englishLetterMached && superNumberMached) mainPrize = prizes[0];
        else if (matchNumberCount === 4 && englishLetterMached) mainPrize = prizes[1];
        else if (matchNumberCount === 4 && superNumberMached) mainPrize = prizes[2];
        else {
            if (matchNumberCount === 4) mainPrize = prizes[3];
            else if (matchNumberCount === 3 && englishLetterMached) mainPrize = prizes[4];
            else if (matchNumberCount === 3) mainPrize = prizes[5];
            else if (matchNumberCount === 2 && englishLetterMached) mainPrize = prizes[6];
            else if (matchNumberCount === 2) mainPrize = prizes[7];
            else if (matchNumberCount === 1 && englishLetterMached) mainPrize = prizes[8];
            else if (matchNumberCount === 1) mainPrize = prizes[9];
            else if (englishLetterMached) mainPrize = prizes[10];

            if (superNumberMached) mainPrize += prizes[11];
        }
        if (mainPrize === 0 && superNumberMached) mainPrize = prizes[11];
        return mainPrize;
    }
}
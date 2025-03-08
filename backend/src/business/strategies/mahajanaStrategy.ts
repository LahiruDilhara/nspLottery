import LotteryDataEntity from "../entities/LotteryDataEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";
import _ from "lodash";
import ResultMatcher from "./ResultMatcher";

export default class MahajanaStrategy extends ResultMatcher implements ILotteryStrategy {

    toString(): string {
        return "mahajana";
    }


    formatDate(dateString: string): Date {
        let [day, month, year] = dateString.split(".");
        let formattedDate = `${year}-${month}-${day}`;
        return new Date(formattedDate);
    }

    parseNumbers(numbers: string): string[] {
        return numbers.split("");
    }

    parseQRTokens(tokens: string[], qrIndexes: QRIndexes): LotteryDataEntity {
        let numbers: string[] = [];
        if (qrIndexes.numbers.length === 1) {
            numbers = tokens[qrIndexes.numbers[0]].split("");
        }
        else {
            numbers = qrIndexes.numbers.map(numberIndex => tokens[numberIndex])
        }
        return {
            barcode: tokens[qrIndexes.barCode],
            drawNo: tokens[qrIndexes.drawNo],
            numbers: numbers,
            symboles: qrIndexes.symboles.map(symboleIndex => tokens[symboleIndex]),
            specialSymboles: qrIndexes.specialSymboles.map((specialSymbole => ({ category: specialSymbole.category, symboles: specialSymbole.indexes.map(specialSymboleIndex => tokens[specialSymboleIndex]) })))
        }
    }

    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity {
        // get the maching main numbers which are formatted in correct order
        let machedMainNumbers = this.matchInDirectionContinious(result.numbers, lotteryData.numbers);

        // get the maching symboles which are formatted in correct order
        let machedSymboles = this.matchAllInOrderDescrete(result.symboles, lotteryData.symboles);

        // get the maching special symboles which are formatted in correct order
        let machedSpecialSymboles: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        // calculate the main prize for the ada kotipathi lottery
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machedMainNumbers.leftMatchCount, machedMainNumbers.rightMatchCount, machedSymboles.matchCount !== 0);

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

    calculateMainPrize(prizes: number[], startMatchCounter: number, endMatchCounter: number, symboleMatched: boolean): number {
        if (endMatchCounter === 6 && symboleMatched) return prizes[0];
        else if (endMatchCounter === 6) return prizes[1];
        else if (endMatchCounter === 5) return prizes[2];
        else if (startMatchCounter === 5) return prizes[3];
        else if (endMatchCounter === 4) return prizes[4];
        else if (endMatchCounter === 3) return prizes[5];
        else if (startMatchCounter === 4) return prizes[6];
        else if (endMatchCounter === 2) return prizes[7];
        else if (startMatchCounter === 3) return prizes[8];
        else if (startMatchCounter === 2) return prizes[9];
        else if (endMatchCounter === 1) return prizes[10];
        else if (startMatchCounter === 1) return prizes[11];
        else if (symboleMatched) return prizes[12];

        return 0
    }
}
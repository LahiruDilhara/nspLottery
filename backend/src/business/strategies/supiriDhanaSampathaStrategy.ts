import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryEnitity from "../entities/LotteryEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";
import _ from "lodash";

export default class SupiriDhanaSampathaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Supiri Dhana Sampatha";
        lottery.drawNo = tokens[0];
        lottery.date = this.formatDate(tokens[1]);
        lottery.barCode = tokens[2];
        lottery.symbole = tokens[3];
        lottery.numbers = tokens.slice(4, 10);
        lottery.specialSymboles = tokens.slice(10);

        return lottery;
    }
    toString(): string {
        return "supiri dhana sampatha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
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

    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity {
        // get the maching main numbers which are formatted in correct order
        let machedMainNumbers: { number: string, matched: boolean }[] = this.matchMainNumbersInOrder(result.numbers, lotteryData.numbers);

        // get the maching symboles which are formatted in correct order
        let machedSymboles: { symbole: string, matched: boolean }[] = this.matchSymboles(result.symboles, lotteryData.symboles);

        // get the maching special symboles which are formatted in correct order
        let machedSpecialSymboles: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        // matched in any order
        let matchedInAnyOrder = this.checkAllExistInAnyOrder(result.numbers, lotteryData.numbers);

        // calculate the main prize for the ada kotipathi lottery
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machedMainNumbers, machedSymboles[0].matched, matchedInAnyOrder);

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

    calculateMainPrize(prizes: number[], matchedMainNumbers: { number: string, matched: boolean }[], symboleMatched: boolean, existsInAnyOrder: boolean): number {
        let startMatchCounter = this.matchedCountFromStart(matchedMainNumbers);
        let endMatchCounter = this.matchedCountFromEnd(matchedMainNumbers);

        if (endMatchCounter === 6 && symboleMatched) return prizes[0];
        else if (endMatchCounter === 6) return prizes[1];
        else if (endMatchCounter === 5) return prizes[2];
        else if (startMatchCounter === 5) return prizes[3];
        else if (endMatchCounter === 4) return prizes[4];
        else if (endMatchCounter === 3) return prizes[5];
        else if (startMatchCounter === 4) return prizes[6];
        else if (existsInAnyOrder) return prizes[7];
        else if (endMatchCounter === 2) return prizes[8];
        else if (startMatchCounter === 3) return prizes[9];
        else if (startMatchCounter === 2) return prizes[10];
        else if (endMatchCounter === 1) return prizes[11];
        else if (startMatchCounter === 1) return prizes[12];
        else if (symboleMatched) return prizes[13];

        return 0
    }

    matchedCountFromStart(matchedMainNumbers: { number: string, matched: boolean }[]): number {
        let counter = 0;

        for (let mN of matchedMainNumbers) {
            if (!mN.matched) break;
            counter++;
        }

        return counter;
    }

    matchedCountFromEnd(matchedMainNumbers: { number: string, matched: boolean }[]) {
        let pointer = matchedMainNumbers.length - 1;
        let counter = 0;

        for (let i = pointer; i >= 0; i--) {
            if (!matchedMainNumbers[i].matched) break;
            counter++;
        }

        return counter;
    }


    checkAllExistInAnyOrder(resultNumbers: string[], lotteryNumbers: string[]) {
        let copyLotteryNumber = [...lotteryNumbers];

        for (let i of resultNumbers) {
            let index = _.indexOf(copyLotteryNumber, i);
            if (index === -1) return false;

            _.pullAt(copyLotteryNumber, index);
        }

        return true;
    }

}
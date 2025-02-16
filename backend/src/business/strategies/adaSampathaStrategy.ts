import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryEnitity from "../entities/LotteryEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";

export default class AdaSampathaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Ada Sampatha";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDate(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.symbole = tokens[5];
        lottery.numbers = tokens.slice(6, 9);
        lottery.specialSymboles = tokens.slice(9);

        return lottery;
    }

    toString(): string {
        return "Ada Sampatha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

    formatDate(dateString: string): Date {
        let [day, month, year] = dateString.split(".");
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
        let machedMainNumbers: { number: string, matched: boolean }[] = this.matchMainNumbers(result.numbers, lotteryData.numbers);

        // get the maching symboles which are formatted in correct order
        let machedSymboles: { symbole: string, matched: boolean }[] = this.matchSymboles(result.symboles, lotteryData.symboles);

        // get the maching special symboles which are formatted in correct order
        let machedSpecialSymboles: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        // calculate the main prize for the ada kotipathi lottery
        let totalWinMainPrize = this.calculateMainPrize(result.prizes, machedMainNumbers, machedSymboles[0].matched);

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

    calculateMainPrize(prizes: number[], matchedMainNumbers: { number: string, matched: boolean }[], symboleMatched: boolean): number {
        if (matchedMainNumbers[2].matched && symboleMatched) return prizes[0];
        else if (matchedMainNumbers[2].matched && matchedMainNumbers[1].matched && matchedMainNumbers[0].matched) return prizes[1] + prizes[2] + prizes[3];
        else if (matchedMainNumbers[2].matched && matchedMainNumbers[1].matched) return prizes[1] + prizes[2];
        else if (matchedMainNumbers[2].matched && matchedMainNumbers[0].matched) return prizes[1] + prizes[3];
        else if (matchedMainNumbers[2].matched) return prizes[1];
        else if (matchedMainNumbers[1].matched && matchedMainNumbers[0].matched) return prizes[2] + prizes[3];
        else if (matchedMainNumbers[1].matched) return prizes[2];
        else if (matchedMainNumbers[0].matched) return prizes[3];
        else if (symboleMatched) return 80;
        else return 0
    }

}
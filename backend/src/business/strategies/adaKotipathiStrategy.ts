import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryEnitity from "../entities/LotteryEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import _ from "lodash";
import { MatchSpecialSymbole, QRIndexes, Result } from "../types/types";

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

        return lottery;
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

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

    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity {
        let matchNumbers: string[] = _.intersection(result.numbers, lotteryData.numbers);
        let symboleMatched: boolean = result.symboles[0] === lotteryData.symboles[0];

        let mainPrize = this.calculateMainPrize(result.prizes, matchNumbers.length, symboleMatched);

        let specialSymboleMatched: MatchSpecialSymbole[] = this.checkSpecialSymboles(result.specialSymboles, lotteryData.specialSymboles);

        console.log(matchNumbers);
        console.log(symboleMatched);
        console.log(specialSymboleMatched);
        console.log(specialSymboleMatched[0].symboles)

        return new LotteryResultEntity()

    }


    calculateMainPrize(prizes: number[], matchNumberCount: number, symboleMatched: boolean): number {
        if (matchNumberCount === 4 && symboleMatched) return prizes[0]
        else if (matchNumberCount === 4) return prizes[2]
        else if (matchNumberCount === 3 && symboleMatched) return prizes[3]
        else if (matchNumberCount === 3) return prizes[4]
        else if (matchNumberCount === 2 && symboleMatched) return prizes[5]
        else if (matchNumberCount === 2) return prizes[6]
        else if (matchNumberCount === 1 && symboleMatched) return prizes[7]
        else if (matchNumberCount === 1) return prizes[8]
        else if (symboleMatched) return prizes[9]
        else return 0
    }
}

type mainMatch = {
    text: string,
    match: boolean
}[]
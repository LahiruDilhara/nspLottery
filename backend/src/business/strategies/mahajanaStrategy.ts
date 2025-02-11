import { strict } from "assert";
import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class MahajanaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Mahajana Sampatha";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDate(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.symbole = tokens[5];
        lottery.numbers = this.parseNumbers(tokens[6]);
        lottery.specialSymboles = tokens.slice(7);

        return lottery;
    }


    toString(): string {
        return "mahajana";
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

    parseNumbers(numbers: string): string[] {
        return numbers.split("");
    }
}
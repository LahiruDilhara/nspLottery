import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class SasiriStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Sasiri";
        lottery.drawNo = tokens[0];
        lottery.date = this.formatDate(tokens[1]);
        lottery.barCode = tokens[2];
        lottery.numbers = tokens.slice(3, 6);
        lottery.specialSymboles = tokens.slice(6);

        return lottery;
    }


    toString(): string {
        return "sasiri";
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

}
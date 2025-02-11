import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class ShanidaStrategy extends ILotteryStrategy {
    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Shanida";
        lottery.drawNo = tokens[0];
        lottery.date = this.formatDate(tokens[1]);
        lottery.barCode = tokens[2];
        lottery.symbole = tokens[3];
        lottery.numbers = tokens.slice(4, 8);
        lottery.specialSymboles = tokens.slice(8);

        return lottery;
    }
    toString(): string {
        return "shanida";
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
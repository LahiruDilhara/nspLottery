import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class JayaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Jaya";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDate(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.symbole = tokens[5];
        lottery.numbers = tokens.slice(6, 10);
        lottery.specialSymboles = tokens.slice(10);
        return lottery;
    }
    toString(): string {
        return "jaya"
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

}
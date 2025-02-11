import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class KaprukaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Kapruka";
        lottery.drawNo = tokens[1];
        lottery.date = this.formatDate(tokens[2]);
        lottery.barCode = tokens[3];
        lottery.numbers = tokens.slice(4, 8);
        lottery.symbole = tokens[8];
        lottery.symbole1 = tokens[9];
        lottery.specialSymboles = tokens.slice(10);

        return lottery;
    }

    toString(): string {
        return "kapruka";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
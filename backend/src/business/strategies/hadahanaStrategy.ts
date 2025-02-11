import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class HadahanaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Handahana";
        lottery.drawNo = tokens[1];
        lottery.date = this.formatDate(tokens[2]);
        lottery.barCode = tokens[3];
        lottery.symbole = tokens[4];
        lottery.numbers = tokens.slice(5, 9);
        lottery.specialSymboles = tokens.slice(9);

        return lottery;
    }
    toString(): string {
        return "hadahana";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
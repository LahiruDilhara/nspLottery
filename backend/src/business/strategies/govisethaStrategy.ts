import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class GovisethaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {

        const lottery = new LotteryEnitity();

        lottery.name = "Gove Setha";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDateMethod1(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.symbole = tokens[5];
        lottery.numbers = tokens.slice(6, 10)
        lottery.specialSymboles = tokens.slice(10);

        return lottery;
    }

    toString(): string {
        return "govisetha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }
}
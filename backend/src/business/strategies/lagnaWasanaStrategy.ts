import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class LagnaWasanaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Lagna Wasana";
        lottery.drawNo = tokens[2];
        lottery.date = this.formatDateMethod1(tokens[3]);
        lottery.barCode = tokens[4];
        lottery.numbers = tokens.slice(5, 9);
        lottery.symbole = tokens[9];
        lottery.specialSymboles = tokens.slice(10);

        return lottery;
    }

    toString(): string {
        return "Lagna wasana";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }
}
import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class DhanaNidhanayaStrategy extends ILotteryStrategy {
    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Dhana Nidhanaya";
        lottery.drawNo = tokens[2];
        lottery.symbole = tokens[3];
        lottery.numbers = tokens.slice(4, 8);
        lottery.specialSymboles = tokens.slice(8, tokens.length - 3);
        lottery.barCode = tokens[tokens.length - 2];
        lottery.specialSymboles.push(tokens[tokens.length - 1]);
        lottery.date = this.formatDate(tokens[tokens.length - 3]);
        return lottery;
    }
    toString(): string {
        return "Dhana nidhanaya";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
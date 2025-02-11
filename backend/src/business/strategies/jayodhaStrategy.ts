import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class JayodhaStrategy extends ILotteryStrategy {

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Jayoda";
        lottery.drawNo = tokens[1];
        lottery.date = this.formatDateMethod1(tokens[2]);
        lottery.barCode = tokens[3];
        lottery.numbers = tokens.slice(4, 8);
        lottery.symbole = tokens[8];
        lottery.specialSymboles = tokens.slice(9);

        return lottery;
    }
    toString(): string {
        return "jayodha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }
}
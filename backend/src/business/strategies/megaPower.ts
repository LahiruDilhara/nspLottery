import LotteryEnitity from "../entities/LotteryEntity";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class MegaPowerStrategy extends ILotteryStrategy {
    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        const lottery = new LotteryEnitity();

        lottery.name = "Mega Power";
        lottery.drawNo = tokens[2];
        lottery.symbole = tokens[3];
        lottery.symbole1 = tokens[4];
        lottery.numbers = tokens.slice(5, 9);
        lottery.date = this.formatDate(tokens[9]);
        lottery.barCode = tokens[10];
        lottery.specialSymboles = tokens.slice(11);

        return lottery;
    }
    toString(): string {
        return "mega power";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
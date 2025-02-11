import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class MahajanaStrategy extends ILotteryStrategy {
    toString(): string {
        return "mahajana";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
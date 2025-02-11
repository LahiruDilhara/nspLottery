import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class HadahanaStrategy extends ILotteryStrategy {
    toString(): string {
        return "hadahana";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
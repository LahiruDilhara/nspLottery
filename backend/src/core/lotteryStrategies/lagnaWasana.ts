import ILotteryStrategy from "../../interfaces/ILotteryStrategy";

export default class LagnaWasanaStrategy extends ILotteryStrategy {
    toString(): string {
        return "Lagna wasana";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
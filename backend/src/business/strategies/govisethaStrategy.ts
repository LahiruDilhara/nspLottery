import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class GovisethaStrategy extends ILotteryStrategy {
    toString(): string {
        return "govisetha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
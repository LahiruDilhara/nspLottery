import ILotteryStrategy from "../../interfaces/ILotteryStrategy";

export default class superBallStrategy extends ILotteryStrategy {
    toString(): string {
        return "super ball";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
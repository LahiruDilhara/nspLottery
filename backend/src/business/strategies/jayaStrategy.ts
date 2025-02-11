import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class JayaStrategy extends ILotteryStrategy {
    toString(): string {
        return "jaya"
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class KaprukaStrategy extends ILotteryStrategy {
    toString(): string {
        return "kapruka";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
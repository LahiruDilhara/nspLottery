import ILotteryStrategy from "../../interfaces/ILotteryStrategy";

export default class SasiriStrategy extends ILotteryStrategy {
    toString(): string {
        return "sasiri";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
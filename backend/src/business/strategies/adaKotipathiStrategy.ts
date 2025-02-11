import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class AdaKotipathiStrategy extends ILotteryStrategy {

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

    toString(): string {
        return "Ada Kotipathi";
    }

}
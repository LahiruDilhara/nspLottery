import ILotteryStrategy from "../../interfaces/ILotteryStrategy";

export default class AdaSampathaStrategy extends ILotteryStrategy {

    toString(): string {
        return "Ada Sampatha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
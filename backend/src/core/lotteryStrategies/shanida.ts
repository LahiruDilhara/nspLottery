import ILotteryStrategy from "../../interfaces/ILotteryStrategy";

export default class ShanidaStrategy extends ILotteryStrategy {
    toString(): string {
        return "shanida";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
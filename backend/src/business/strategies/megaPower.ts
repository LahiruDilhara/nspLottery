import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class MegaPowerStrategy extends ILotteryStrategy {
    toString(): string {
        return "mega power";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class DhanaNidhanayaStrategy extends ILotteryStrategy {
    toString(): string {
        return "Dhana nidhanaya";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
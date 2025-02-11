import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class JayodhaStrategy extends ILotteryStrategy {
    toString(): string {
        return "jayodha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
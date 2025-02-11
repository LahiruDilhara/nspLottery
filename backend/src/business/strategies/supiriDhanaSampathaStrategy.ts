import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default class SupiriDhanaSampathaStrategy extends ILotteryStrategy {
    toString(): string {
        return "supiri dhana sampatha";
    }

    async checkResult(tokens: string[]): Promise<number> {
        console.log(tokens);
        return 10;
    }

}
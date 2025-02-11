import LotteryEnitity from "../entities/LotteryEntity";

export default abstract class ILotteryStrategy {
    abstract checkResult(tokens: string[]): Promise<number>;

    abstract toString(): string;

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        return new LotteryEnitity();
    }
}
export default abstract class ILotteryStrategy {
    abstract checkResult(tokens: string[]): Promise<number>;
    abstract toString(): string;
}
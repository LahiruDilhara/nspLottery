import LotteryEnitity from "../entities/LotteryEntity";

export default abstract class ILotteryStrategy {
    abstract checkResult(tokens: string[]): Promise<number>;

    abstract toString(): string;

    parseFromQRStringTokens(tokens: string[]): LotteryEnitity {
        return new LotteryEnitity();
    }

    formatDateMethod1(dateString: string): Date {
        // convert the & signs in the date string to - signs
        const formattedDate = dateString.replace(/&/g, "-");
        return new Date(formattedDate);
    }
}
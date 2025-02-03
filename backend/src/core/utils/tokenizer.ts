export default class Tokenizer {
    static tokenLottery(lotteryDataString: string): string[] {
        let processedString = lotteryDataString.replace("\n", "");
        let tokens: string[] = processedString.split(" ");
        return tokens;
    }
}
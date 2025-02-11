export default class Tokenizer {
    static tokenLottery(lotteryDataString: string): string[] {
        console.log(lotteryDataString);
        let processedString = lotteryDataString.replace("\n", "");
        let tokens: string[] = processedString.split(/\s+/);
        return tokens;
    }
}
export default class Tokenizer {
    static tokenizeStringBySpaces(lotteryDataString: string): string[] {
        console.log(lotteryDataString);
        let processedString = lotteryDataString.replace("\n", "");
        let tokens: string[] = processedString.split(/\s+/);
        return tokens;
    }
}
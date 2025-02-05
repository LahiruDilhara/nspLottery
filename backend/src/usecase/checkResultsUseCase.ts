import LotteryRegex from "../core/constants/lotteryRegex";
import Tokenizer from "../core/utils/tokenizer";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default async function CheckResult(lotteryDataString: string): Promise<string> {
    let strategy = selectTheStrategy(lotteryDataString);
    if (strategy == null) {
        return "Unrecognized lottery type"
    }
    let lotteryStringToken = Tokenizer.tokenLottery(lotteryDataString);

    return (await strategy.checkResult(lotteryStringToken)).toString();
    // return strategy.toString();
}

function selectTheStrategy(lotteryDataString: string): ILotteryStrategy | null {
    for (const lotteryRegex of LotteryRegex) {

        // reset the regex last index to 0. because it is save its previous state which means the index where it was left. so this might cause problems. so that's why manually remove this state.
        lotteryRegex.regex.lastIndex = 0;

        if (lotteryRegex.regex.test(lotteryDataString)) {
            return lotteryRegex.strategy;
        }
    }
    return null;
}
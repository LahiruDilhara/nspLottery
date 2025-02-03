import LotteryRegex from "../core/constants/lotteryRegex";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";

export default function CheckResult(lotteryDataString: string): string {
    let strategy = selectTheStrategy(lotteryDataString);
    if (strategy == null) {
        return "null"
    }
    return strategy.toString();
}

function selectTheStrategy(lotteryDataString: string): ILotteryStrategy | null {
    console.log(lotteryDataString.length);
    for (const lotteryRegex of LotteryRegex) {

        // reset the regex last index to 0. because it is save its previous state which means the index where it was left. so this might cause problems. so that's why manually remove this state.
        lotteryRegex.regex.lastIndex = 0;

        if (lotteryRegex.regex.test(lotteryDataString)) {
            return lotteryRegex.strategy;
        }
    }
    return null;
}
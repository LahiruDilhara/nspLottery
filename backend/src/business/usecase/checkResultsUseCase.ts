import LotteryRegex from "../../core/constants/lotteryRegex";
import LotteryParser from "../../core/utils/lotteryParser";
import Tokenizer from "../../core/utils/tokenizer";
import ILotteryStrategy from "../interfaces/ILotteryStrategy";
import LotteryStrategyFactory from "../strategies/lotteryStrategyFactory";
import IResultRepository from '../interfaces/IResultRepository';
import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";

export default async function CheckResultFromLotteryString(lotteryDataString: string): Promise<object> {
    // get the appropriate lottery strategy
    let strategy = selectTheStrategy(lotteryDataString);

    if (strategy == null) {
        throw new Error("Unrecognized lottery type");
    }

    // tokanize the lottery data string
    let lotteryStringToken = Tokenizer.tokenizeStringBySpaces(lotteryDataString);

    // return (await strategy.checkResult(lotteryStringToken)).toString();
    // return .toString();
    return strategy.parseFromQRStringTokens(lotteryStringToken);
    // return { name: strategy.toString() };
}

export async function CheckResultFromQR(QRDataString: string, resultRepository: IResultRepository): Promise<object> {

    // get the date from the lottery qr
    let date: Date | null = LotteryParser.parseDate(QRDataString);
    if (date == null) throw Error("The QR hasn't valid date");

    // get the scheme list from the repository for the given date
    let scheme = resultRepository.getLotteryIdentifierScemeList(date);
    if (scheme == null) throw Error("There is no scheme defined for this date");

    // identify the lottery from the qr string
    let lotteryName: string | null = null;
    scheme.forEach((lotteryScheme) => {
        if (lotteryScheme.regex.test(QRDataString)) {
            lotteryName = lotteryScheme.name;
        }
    });
    if (lotteryName == null) throw Error("The Lottery is not found for the given QR");

    // identify the appropriate lottery strategy to parse the lottery.
    let lotteryStrategy: ILotteryStrategy | null = LotteryStrategyFactory.getLotteryStrategy(lotteryName);
    if (lotteryStrategy == null) throw Error("There is no strategy define for this lottery type");

    // tokenized the QR code by spaces
    let qrTokens: string[] = Tokenizer.tokenizeStringBySpaces(QRDataString);

    // get the result scheet for the specified date
    let resultSheet = resultRepository.getResultScheet(lotteryName, date);
    if (resultSheet == null) throw Error(`There is no result sheet found for the lottery ${lotteryName} on date ${date}`);
    if (resultSheet.qrIndexes.tokensLength != qrTokens.length) throw Error("Invalid qr token length");

    // get the lottery Entity object by parsing the qr tokens through the strategy
    let lotteryData: LotteryDataEntity = lotteryStrategy.parseQRTokens(qrTokens, resultSheet.qrIndexes);

    // check the result using the lotteryDataEntity
    lotteryStrategy.checkTheResult(resultSheet.results, lotteryData);

    return Object();

}

function selectTheStrategy(lotteryDataString: string): ILotteryStrategy | null {
    for (let [lotteryType, regex] of LotteryRegex) {

        // reset the regex last index to 0. because it is save its previous state which means the index where it was left. so this might cause problems. so that's why manually remove this state.
        regex.lastIndex = 0;

        if (regex.test(lotteryDataString)) {
            // return LotteryStrategyFactory.getLotteryStrategy(lotteryType);
        }
    }
    return null;
}


/**
 * find the lottery type
 * delegate the result check to specified lottery type
 * parse the entire string into sub parts
 * parse the lottery date.
 * get the specified date result sheet from the database
 * check the result in default results
 * for special results the value is in the result sheet itself.
 * then combine the results into single int
 * then return it.
 * the QR should only parsed and give all the informations inside it.
 */
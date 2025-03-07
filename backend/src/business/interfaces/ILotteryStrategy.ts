import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import { LotterySpecialSymbole, MatchSpecialSymbole, QRIndexes, Result, SpecialSymbole } from "../types/types";

export default interface ILotteryStrategy {

    toString(): string;
    parseQRTokens(tokens: string[], qrIndexes: QRIndexes): LotteryDataEntity | null;
    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity | null;
}


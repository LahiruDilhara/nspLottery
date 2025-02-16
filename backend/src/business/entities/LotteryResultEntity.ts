import { MatchSpecialSymbole, Result } from "../types/types";

export default class LotteryResultEntity {
    totalWinMainPrice!: number;
    matchedCategoryCount!: number;
    matchedMainNumbers!: { number: string, matched: boolean }[];
    matchedMainSymboles!: { symbole: string, matched: boolean }[];
    matchedSpecialSymboles!: MatchSpecialSymbole[];
}
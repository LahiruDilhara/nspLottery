import { MatchSpecialSymbole, Result } from "../types/types";

export default class LotteryResultEntity {
    totalWinMainPrice!: number;
    matchedCategoryCount!: number;
    matchedMainNumbers!: { symbole: string, matched: boolean }[];
    matchedMainSymboles!: { symbole: string, matched: boolean }[];
    matchedSpecialSymboles!: MatchSpecialSymbole[];
}
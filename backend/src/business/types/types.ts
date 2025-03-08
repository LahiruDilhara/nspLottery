export type QRIndexes = {
    tokensLength: number;
    drawNo: number;
    barCode: number;
    numbers: number[];
    symboles: number[];
    specialSymboles: { category: string, indexes: number[] }[];
};

export type Result = {
    numbers: string[];
    symboles: string[];
    prizes: number[]
    specialSymboles: SpecialSymbole[];
};

export type SpecialSymbole = { category: string, method: string, results: string[], gift: string, description: string }

export type LotterySpecialSymbole = { category: string, symboles: string[] }

export type MatchSpecialSymbole = { category: string, symboles: { symbole: string, matched: boolean }[], gift: string, matched: boolean }

export type SymboleMatch = {
    matchCount: number;
    totalCount: number;
    matchStatus: { symbole: string, matched: boolean }[]
}

export type SymboleMatchInDirection = {
    matchCount: number;
    totalCount: number;
    matchStatus: { symbole: string, matched: boolean }[];
    leftMatchCount: number;
    rightMatchCount: number;
}
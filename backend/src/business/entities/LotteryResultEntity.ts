export default class LotteryResultEntity {
    totalWinPrize!: number;
    specialSymboleWinGifts!: { category: string, gift: string }[];
    resultStatus!: {
        numbers: { number: string, matched: boolean }[],
        symboles: { symbole: string, matched: boolean }[],
        specialSymboles: { category: string, symboles: { symbole: string, matched: boolean }[] }
    }
}
import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import { LotterySpecialSymbole, MatchSpecialSymbole, QRIndexes, Result, SpecialSymbole } from "../types/types";

export default abstract class ILotteryStrategy {

    abstract toString(): string;

    abstract parseQRTokens(tokens: string[], qrIndexes: QRIndexes): LotteryDataEntity | null;

    abstract checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity | null;

    checkSpecialSymboles(resultSpecialSymboles: SpecialSymbole[], lotterySpecialSymboles: LotterySpecialSymbole[]): MatchSpecialSymbole[] {
        let matchList: MatchSpecialSymbole[] = [];

        lotterySpecialSymboles.forEach((lotterySymbole) => {
            // find the result symbole that match the category
            let resultSymbole = resultSpecialSymboles.find((resultSymbole) => resultSymbole.category === lotterySymbole.category);

            if (resultSymbole == undefined || resultSymbole == null) return;

            // if that category is OneToOne format, call the OneToOne method to calculate the machings
            if (resultSymbole.method === "OneToOne") {
                matchList.push(this.oneToOneMatch(resultSymbole, lotterySymbole));
            }
        });

        return matchList;
    }

    oneToOneMatch(resultSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymbole): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: resultSymbole.category,
            symboles: [],
            gift: resultSymbole.gift,
            matched: false
        };

        // match the symbole
        if (lotterySymbole.symboles[0] === resultSymbole.results[0]) {
            match.symboles.push({ matched: true, symbole: lotterySymbole.symboles[0] });
            match.matched = true;
        }
        else {
            match.symboles.push({ matched: false, symbole: lotterySymbole.symboles[0] })
            match.matched = false;
        }

        return match;
    }

    matchMainNumbers(resultNumbers: string[], lotteryNumbers: string[]): { number: string, matched: boolean }[] {
        let maches: { number: string, matched: boolean }[] = []
        lotteryNumbers.forEach(lotteryNumber => {
            if (resultNumbers.find(resultNumber => resultNumber === lotteryNumber)) {
                maches.push({ number: lotteryNumber, matched: true });
            } else {
                maches.push({ number: lotteryNumber, matched: false });
            }
        })

        return maches;
    }

    matchSymboles(resultSymboles: string[], lotterySymboles: string[]): { symbole: string, matched: boolean }[] {
        let maches: { symbole: string, matched: boolean }[] = [];
        lotterySymboles.forEach(lotterySymbole => {
            if (resultSymboles.find(resultSymbole => resultSymbole === lotterySymbole)) {
                maches.push({ symbole: lotterySymbole, matched: true });
            } else {
                maches.push({ symbole: lotterySymbole, matched: false });
            }
        })

        return maches;
    }

    matchMainNumbersInOrder(resultNumbers: string[], lotteryNumbers: string[]): { number: string, matched: boolean }[] {
        let maches: { number: string, matched: boolean }[] = [];

        lotteryNumbers.forEach((lotteryNumber, index) => {
            if (resultNumbers[index] === lotteryNumber) {
                maches.push({ number: lotteryNumber, matched: true });
            }
            else {
                maches.push({ number: lotteryNumber, matched: false });
            }
        })

        return maches;
    }

    matchSymbolesInOrder(resultSymboles: string[], lotterySymboles: string[]): { symbole: string, matched: boolean }[] {
        let maches: { symbole: string, matched: boolean }[] = [];
        lotterySymboles.forEach((lotterySymbole, index) => {
            if (resultSymboles[index] === lotterySymbole) {
                maches.push({ symbole: lotterySymbole, matched: true });
            } else {
                maches.push({ symbole: lotterySymbole, matched: false });
            }
        })

        return maches;
    }
}


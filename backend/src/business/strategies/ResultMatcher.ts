import { LotterySpecialSymbole, MatchSpecialSymbole, SpecialSymbole } from "../types/types";

export default class ResultMatcher {

    checkSpecialSymboles(wonSymboles: SpecialSymbole[], lotterySymboles: LotterySpecialSymbole[]): MatchSpecialSymbole[] {
        let matchList: MatchSpecialSymbole[] = [];

        lotterySymboles.forEach((lotterySymbole) => {
            // find the result symbole that match the category
            let resultSymbole = wonSymboles.find((resultSymbole) => resultSymbole.category === lotterySymbole.category);

            if (resultSymbole == undefined || resultSymbole == null) return;

            // if that category is OneToOne format, call the OneToOne method to calculate the machings
            if (resultSymbole.method === "OneToOne") {
                matchList.push(this.oneToOneMatch(resultSymbole, lotterySymbole));
            }
        });

        return matchList;
    }

    oneToOneMatch(wonSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymbole): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: wonSymbole.category,
            symboles: [],
            gift: wonSymbole.gift,
            matched: false
        };

        // match the symbole
        if (lotterySymbole.symboles[0] === wonSymbole.results[0]) {
            match.symboles.push({ matched: true, symbole: lotterySymbole.symboles[0] });
            match.matched = true;
        }
        else {
            match.symboles.push({ matched: false, symbole: lotterySymbole.symboles[0] })
            match.matched = false;
        }

        return match;
    }

    matchMainNumbers(wonNmbers: string[], lotteryNumbers: string[]): { number: string, matched: boolean }[] {
        let maches: { number: string, matched: boolean }[] = []
        lotteryNumbers.forEach(lotteryNumber => {
            if (wonNmbers.find(resultNumber => resultNumber === lotteryNumber)) {
                maches.push({ number: lotteryNumber, matched: true });
            } else {
                maches.push({ number: lotteryNumber, matched: false });
            }
        })

        return maches;
    }

    matchSymboles(wonSymboles: string[], lotterySymboles: string[]): { symbole: string, matched: boolean }[] {
        let maches: { symbole: string, matched: boolean }[] = [];
        lotterySymboles.forEach(lotterySymbole => {
            if (wonSymboles.find(resultSymbole => resultSymbole === lotterySymbole)) {
                maches.push({ symbole: lotterySymbole, matched: true });
            } else {
                maches.push({ symbole: lotterySymbole, matched: false });
            }
        })

        return maches;
    }

    matchMainNumbersInOrder(wonNumbers: string[], lotteryNumbers: string[]): { number: string, matched: boolean }[] {
        let maches: { number: string, matched: boolean }[] = [];

        lotteryNumbers.forEach((lotteryNumber, index) => {
            if (wonNumbers[index] === lotteryNumber) {
                maches.push({ number: lotteryNumber, matched: true });
            }
            else {
                maches.push({ number: lotteryNumber, matched: false });
            }
        })

        return maches;
    }

    matchSymbolesInOrder(wonSymboles: string[], lotterySymboles: string[]): { symbole: string, matched: boolean }[] {
        let maches: { symbole: string, matched: boolean }[] = [];
        lotterySymboles.forEach((lotterySymbole, index) => {
            if (wonSymboles[index] === lotterySymbole) {
                maches.push({ symbole: lotterySymbole, matched: true });
            } else {
                maches.push({ symbole: lotterySymbole, matched: false });
            }
        })

        return maches;
    }
}
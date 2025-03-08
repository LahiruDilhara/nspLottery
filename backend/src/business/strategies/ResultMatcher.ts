import { LotterySpecialSymbole, MatchSpecialSymbole, SpecialSymbole, SymboleMatch, SymboleMatchInDirection } from "../types/types";

export default class ResultMatcher {

    matchAllInOrderDescrete(wonSymboles: string[], lotterySymboles: string[]): SymboleMatch {
        let matches: { symbole: string, matched: boolean }[] = [];
        let total: number = 0;
        let matchCount: number = 0;

        lotterySymboles.forEach((lotterySymbole, index) => {
            if (wonSymboles[index] === lotterySymbole) {
                matches.push({ symbole: lotterySymbole, matched: true });
                matchCount++;
            } else {
                matches.push({ symbole: lotterySymbole, matched: false });
            }
            total++;
        })

        return {
            matchCount: matchCount,
            totalCount: total,
            matchStatus: matches
        }
    }

    matchAllAnyOrderDescrete(wonSymboles: string[], lotterySymboles: string[]): SymboleMatch {
        let matches: { symbole: string, matched: boolean }[] = [];
        let total: number = 0;
        let matchCount: number = 0;

        lotterySymboles.forEach(lotterySymbole => {
            if (wonSymboles.find(resultSymbole => resultSymbole === lotterySymbole)) {
                matches.push({ symbole: lotterySymbole, matched: true });
                matchCount++;
            } else {
                matches.push({ symbole: lotterySymbole, matched: false });
            }
            total++;
        })

        return {
            matchCount: matchCount,
            totalCount: total,
            matchStatus: matches
        }
    }

    matchInDirectionContinious(wonSymboles: string[], lotterySymboles: string[]): SymboleMatchInDirection {
        let matches: { symbole: string, matched: boolean }[] = [];
        let total: number = 0;
        let matchCount: number = 0;
        let leftMatchCount: number = 0;
        let rightMatchCount: number = 0;
        let leftMatched: boolean = true;
        let rightMatched: boolean = true;

        lotterySymboles.forEach((symbole, index) => {
            total++;
            if (symbole === wonSymboles[index]) {
                matchCount++;
                matches.push({ symbole: symbole, matched: true });
            }
            else {
                matches.push({ symbole: symbole, matched: false });
            }

            if (symbole === wonSymboles[index] && leftMatched) {
                leftMatchCount++;
            }
            else {
                leftMatched = false
            }
            let rightEndIndex = lotterySymboles.length - 1 - index;
            if (lotterySymboles[rightEndIndex] === wonSymboles[rightEndIndex] && rightMatched) {
                rightMatchCount++;
            }
            else {
                rightMatched = false;
            }
        })

        return {
            leftMatchCount: leftMatchCount,
            rightMatchCount: rightMatchCount,
            matchCount: matchCount,
            matchStatus: matches,
            totalCount: total
        }

    }

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
            else if (resultSymbole.method === "OneToMany") {
                matchList.push(this.oneToManyMatch(resultSymbole, lotterySymbole))
            }
            else if (resultSymbole.method === "ManyToOne") {
                matchList.push(this.manyToOneMatch(resultSymbole, lotterySymbole))
            }
            else if (resultSymbole.method === "ManyToMany") {
                matchList.push(this.manyToManyMatch(resultSymbole, lotterySymbole))
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
        }

        return match;
    }

    oneToManyMatch(wonSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymbole): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: wonSymbole.category,
            symboles: [],
            gift: wonSymbole.gift,
            matched: false
        };

        // match the symboles
        lotterySymbole.symboles.forEach((symbole, index) => {
            if (symbole === wonSymbole.results[0]) {
                match.symboles.push({ matched: true, symbole: symbole });
                match.matched = true;
            }
            else {
                match.symboles.push({ matched: false, symbole: symbole });
            }
        })

        return match;
    }

    manyToOneMatch(wonSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymbole): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: wonSymbole.category,
            symboles: [],
            gift: wonSymbole.gift,
            matched: false
        };

        // match the symboles
        if (wonSymbole.results.includes(lotterySymbole.symboles[0])) {
            match.symboles.push({ matched: true, symbole: lotterySymbole.symboles[0] });
            match.matched = true;
        }
        else {
            match.symboles.push({ matched: false, symbole: lotterySymbole.symboles[0] })
        }

        return match
    }

    manyToManyMatch(wonSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymbole): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: wonSymbole.category,
            symboles: [],
            gift: wonSymbole.gift,
            matched: false
        };

        // match the symboles
        lotterySymbole.symboles.forEach((symbole, index) => {
            if (wonSymbole.results.includes(symbole)) {
                match.symboles.push({ matched: true, symbole: symbole });
                match.matched = true;
            }
            else {
                match.symboles.push({ matched: false, symbole: symbole });
            }
        })

        return match
    }
}
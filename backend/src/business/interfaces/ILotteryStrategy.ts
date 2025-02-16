import LotteryDataEntity from "../entities/LotteryDataEntity";
import LotteryEnitity from "../entities/LotteryEntity";
import LotteryResultEntity from "../entities/LotteryResultEntity";
import ResultSheetEntity from "../entities/ResultSheetEntity";
import { LotterySpecialSymboles, MatchSpecialSymbole, QRIndexes, Result, SpecialSymbole } from "../types/types";

export default abstract class ILotteryStrategy {
    abstract checkResult(tokens: string[]): Promise<number>;

    abstract toString(): string;

    abstract parseFromQRStringTokens(tokens: string[]): LotteryEnitity;

    formatDate(dateString: string): Date {
        // convert the & signs in the date string to - signs
        const formattedDate = dateString.replace(/&/g, "-");
        return new Date(formattedDate);
    }

    parseQRTokens(tokens: string[], qrIndexes: QRIndexes): LotteryDataEntity {
        return new LotteryDataEntity();
    }

    checkTheResult(result: Result, lotteryData: LotteryDataEntity): LotteryResultEntity {
        return new LotteryResultEntity();
    }


    checkSpecialSymboles(resultSpecialSymboles: SpecialSymbole[], lotterySpecialSymboles: LotterySpecialSymboles[]): MatchSpecialSymbole[] {
        let matchList: MatchSpecialSymbole[] = [];

        lotterySpecialSymboles.forEach((lotterySymbole) => {
            let resultCategory = resultSpecialSymboles.find((resultSymbole) => resultSymbole.category === lotterySymbole.category);

            if (resultCategory == undefined || resultCategory == null) return;

            if (resultCategory.method === "OneToOne") {
                matchList.push(this.oneToOneMatch(resultCategory, lotterySymbole));
            }
        });

        return matchList;
    }

    oneToOneMatch(resultSymbole: SpecialSymbole, lotterySymbole: LotterySpecialSymboles): MatchSpecialSymbole {
        let match: MatchSpecialSymbole = {
            category: resultSymbole.category,
            symboles: [],
            gift: resultSymbole.gift,
            matched: false
        };

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
}


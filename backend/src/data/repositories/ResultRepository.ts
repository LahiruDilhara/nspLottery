import ResultSheetEntity from "../../business/entities/ResultSheetEntity";
import IResultRepository from "../../business/interfaces/IResultRepository";

export default class ResultRepository implements IResultRepository {

    // this should be fetched from the database
    private lotteryScheme: { name: string; regex: RegExp; }[] = [
        { name: "AdaSampatha", regex: /^Ada\s+Sampatha\s+\d+\s+(\d{2}\.){2}\d{4}\s+\d{15}\s+[A-Z](\s+(\d{2,4})){3}/ },
        { name: "Jayodha", regex: /^JAYODA\s+\w+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/ },
        { name: "SupiriDhanaSampatha", regex: /^\d+\s+\d{4}(\.\d+)+\s+\d+\/\d+\/\d+\/\d+\s+\w(\s+\d{1}){6}/ },
        { name: "Kapruka", regex: /^KAPRUKA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]\s+\d{2}/ },
        { name: "SuperBall", regex: /^SUPER\s+BALL\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/ },
        { name: "Hadahana", regex: /^Handaha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Za-z]+(\s+\d{2}){4}/ },
        { name: "DhanaNidhanaya", regex: /^Dhana\s+Nidhanaya\s+\d*\s+[A-Z](\s+\d{2}){4}\s+[A-Z]/ },
        { name: "MegaPower", regex: /^Mega\s+Power\s+\d+\s+[A-Z](\s+\d{2}){5}\s+\d{4}&\d{2}&\d{2}\s+\d{15}/ },
        { name: "Mahajana", regex: /^Mahajana\s+Sampatha\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z]\s+\d{6}/ },
        { name: "Govisetha", regex: /^Govi\s+Setha\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{15}\s+[A-Z](\s+\d{2}){4}/ },
        { name: "AdaKotipathi", regex: /^ADA\s+KOTIPATHI\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Z]/ },
        { name: "LagnaWasana", regex: /^LAGNA\s+WASANA\s+\d+\s+\d{4}&\d{2}&\d{2}\s+\d{16}(\s+\d{2}){4}\s+[A-Za-z]+/ },
        { name: "Shanida", regex: /^\d+\s+\d{4}\.\d{2}\.\d{2}\s+[\d\/]+\s+[A-Za-z](\s+\d{2}){4}/ },
        { name: "Jaya", regex: /^NLB\s+Dinuma\s+\d+\s+\d{2}.\d{2}.\d{4}\s+\d{15}\s+[A-Z](\s+\d){4}/ },
        { name: "Sasiri", regex: /^\d+\s+\d{4}.\d{2}.\d{2}\s+[\d\/]+(\s+\d{2}){3}/ },
    ];

    private adaKotipathiResultScheet: ResultSheetEntity = {
        date: new Date("2025-01-27"),
        name: "Ada Kotipathi",
        qrIndexes: {
            barCode: 4,
            drawNo: 2,
            numbers: [5, 6, 7, 8],
            symboles: [9],
            tokensLength: 12,
            specialSymboles: [
                { category: "first", indexes: [10] }
            ]
        },
        results: {
            numbers: ["01", "18", "70", "75"],
            prizes: [40, 200, 200],
            symboles: ["G"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "car", method: "oneToOne", results: ["684656"] }
            ]
        }
    };
    getLotteryIdentifierScemeList(date: Date): { name: string; regex: RegExp; }[] | null {
        return this.lotteryScheme;
    }


    getResultScheet(lotteryName: string, date: Date): ResultSheetEntity {
        return this.adaKotipathiResultScheet;
    }
}
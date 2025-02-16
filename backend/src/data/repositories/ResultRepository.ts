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
            prizes: [
                50000000,
                2000000,
                200000,
                4000,
                2000,
                200,
                200,
                40,
                40
            ],
            symboles: ["G"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
            ]
        }
    };
    private adaSampathaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-27"),
        name: "Ada Sampatha",
        qrIndexes: {
            drawNo: 2,
            barCode: 4,
            numbers: [6, 7, 8],
            symboles: [5],
            tokensLength: 10,
            specialSymboles: [
            ]
        },
        results: {
            numbers: ["93", "668", "5822"],
            prizes: [
                250000,
                50000,
                4000,
                1000,
                80,
            ],
            symboles: ["F"],
            specialSymboles: [
            ]
        }
    };

    private supiriDhanaSampathaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-27"),
        name: "Supiri Dhana Sampatha",
        qrIndexes: {
            barCode: 2,
            drawNo: 0,
            numbers: [4, 5, 6, 7, 8, 9],
            symboles: [3],
            tokensLength: 13,
            specialSymboles: [
                { category: "first", indexes: [10] },
                { category: "second", indexes: [11] },
            ]
        },
        results: {
            numbers: ["5", "1", "6", "0", "2", "6"],
            prizes: [
                20000000,
                2500000,
                100000,
                100000,
                20000,
                2000,
                2000,
                500,
                200,
                200,
                120,
                40,
                40,
                40,
            ],
            symboles: ["Z"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "50000", method: "OneToOne", results: ["71401"] },
                { category: "second", description: "regular", gift: "40", method: "OneToOne", results: ["580"] },
            ]
        }
    }
    getLotteryIdentifierScemeList(date: Date): { name: string; regex: RegExp; }[] | null {
        return this.lotteryScheme;
    }


    getResultScheet(lotteryName: string, date: Date): ResultSheetEntity | null {
        if (lotteryName == "AdaSampatha") return this.adaSampathaResultSheet;
        else if (lotteryName == "AdaKotipathi") return this.adaKotipathiResultScheet;
        else if (lotteryName == "SupiriDhanaSampatha") return this.supiriDhanaSampathaResultSheet;
        return this.adaKotipathiResultScheet;
    }
}
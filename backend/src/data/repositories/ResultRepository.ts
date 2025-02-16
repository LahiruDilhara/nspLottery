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
    };

    private jayodhaResultScheet: ResultSheetEntity = {
        date: new Date("2025-01-29"),
        name: "Jayodha",
        qrIndexes: {
            barCode: 3,
            drawNo: 1,
            numbers: [4, 5, 6, 7],
            symboles: [8],
            tokensLength: 10,
            specialSymboles: [
            ]
        },
        results: {
            numbers: ["04", "26", "31", "65"],
            prizes: [
                20000000,
                2000000,
                100000,
                4000,
                2000,
                200,
                80,
                40,
                40
            ],
            symboles: ["O"],
            specialSymboles: [
            ]
        }
    };

    private kaprukaResultScheet: ResultSheetEntity = {
        date: new Date("2025-01-29"),
        name: "Jayodha",
        qrIndexes: {
            barCode: 3,
            drawNo: 1,
            numbers: [4, 5, 6, 7],
            symboles: [8, 9],
            tokensLength: 11,
            specialSymboles: [
            ]
        },
        results: {
            numbers: ["02", "41", "50", "59"],
            symboles: ["A", "40"],
            specialSymboles: [
            ],
            prizes: [
                150000000,
                10000000,
                10000000,
                2000000,
                200000,
                4000,
                2000,
                200,
                200,
                40,
                40,
                40
            ],
        }
    };

    private superBallResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Super Ball",
        qrIndexes: {
            barCode: 4,
            drawNo: 2,
            numbers: [5, 6, 7, 8],
            symboles: [9],
            tokensLength: 12,
            specialSymboles: [
                { category: "first", indexes: [10] },
            ]
        },
        results: {
            numbers: ["05", "20", "27", "64"],
            symboles: ["Q"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "50000", method: "OneToOne", results: ["27520"] },
            ],
            prizes: [
                50000000,
                2000000,
                200000,
                4000,
                2000,
                200,
                200,
                40,
                40,
            ],
        }
    };

    private hadahanaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Hadahana",
        qrIndexes: {
            barCode: 3,
            drawNo: 1,
            numbers: [5, 6, 7, 8],
            symboles: [4],
            tokensLength: 12,
            specialSymboles: [
                { category: "first", indexes: [9] },
                { category: "second", indexes: [10] },
            ]
        },
        results: {
            numbers: ["21", "34", "36", "45"],
            symboles: ["SAJ"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "50000", method: "OneToOne", results: ["91738"] },
                { category: "second", description: "regular", gift: "40", method: "OneToOne", results: ["10"] },
            ],
            prizes: [
                3000000,
                1000000,
                25000,
                2000,
                500,
                200,
                120,
                40,
                40,
            ],
        }
    };

    private dhanaNidhanayaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Dhana Nidhanaya",
        qrIndexes: {
            barCode: 11,
            drawNo: 2,
            numbers: [4, 5, 6, 7],
            symboles: [3],
            tokensLength: 13,
            specialSymboles: [
                { category: "first", indexes: [8] },
                { category: "second", indexes: [9] },
            ]
        },
        results: {
            numbers: ["17", "49", "70", "72"],
            symboles: ["A"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "40", method: "OneToOne", results: ["J"] },
                { category: "second", description: "regular", gift: "100000", method: "OneToOne", results: ["69497"] },
            ],
            prizes: [
                80000000,
                2000000,
                200000,
                6000,
                2000,
                200,
                120,
                40,
                40,
            ],
        }
    };

    private megaPowerResultScheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Mega Power",
        qrIndexes: {
            barCode: 10,
            drawNo: 2,
            numbers: [5, 6, 7, 8],
            symboles: [3, 4],
            tokensLength: 12,
            specialSymboles: [
            ]
        },
        results: {
            numbers: ["44", "45", "63", "75"],
            symboles: ["Z", "25"],
            specialSymboles: [
            ],
            prizes: [
                150000000,
                10000000,
                10000000,
                2000000,
                200000,
                5000,
                2000,
                200,
                200,
                40,
                40,
                40
            ],
        }
    };

    private mahajanaSampathaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Mahajana Sampatha",
        qrIndexes: {
            barCode: 4,
            drawNo: 2,
            numbers: [6],
            symboles: [5],
            tokensLength: 8,
            specialSymboles: [
            ]
        },
        results: {
            numbers: ["5", "7", "8", "7", "5", "2"],
            prizes: [
                20000000,
                2500000,
                100000,
                100000,
                15000,
                2000,
                2000,
                200,
                200,
                80,
                40,
                40,
                40,
            ],
            symboles: ["W"],
            specialSymboles: [
            ]
        }
    };


    private govisethaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Govisetha",
        qrIndexes: {
            barCode: 4,
            drawNo: 2,
            numbers: [6, 7, 8, 9],
            symboles: [5],
            tokensLength: 12,
            specialSymboles: [
                { category: "first", indexes: [10] },
            ]
        },
        results: {
            numbers: ["04", "35", "49", "59"],
            symboles: ["F"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "40", method: "OneToOne", results: ["J"] },
            ],
            prizes: [
                60000000,
                2000000,
                250000,
                5000,
                2000,
                200,
                200,
                40,
                40,
            ],
        }
    };

    private lagnaWasanaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-31"),
        name: "Lagna Wasana",
        qrIndexes: {
            barCode: 4,
            drawNo: 2,
            numbers: [5, 6, 7, 8],
            symboles: [9],
            tokensLength: 13,
            specialSymboles: [
                { category: "first", indexes: [10] },
                { category: "second", indexes: [11] },
            ]
        },
        results: {
            numbers: ["09", "18", "24", "40"],
            symboles: ["ARIES"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "50000", method: "OneToOne", results: ["180673"] },
                { category: "second", description: "regular", gift: "40", method: "OneToOne", results: ["525"] },
            ],
            prizes: [
                3000000,
                1000000,
                20000,
                2000,
                400,
                200,
                120,
                40,
                40,
            ],
        }
    };


    private shanidaResultSheet: ResultSheetEntity = {
        date: new Date("2025-01-27"),
        name: "Shanidha",
        qrIndexes: {
            barCode: 2,
            drawNo: 0,
            numbers: [4, 5, 6, 7],
            symboles: [3],
            tokensLength: 10,
            specialSymboles: [
                { category: "first", indexes: [8] },
            ]
        },
        results: {
            numbers: ["12", "34", "36", "74"],
            symboles: ["N"],
            specialSymboles: [
                { category: "first", description: "regular", gift: "50000", method: "OneToOne", results: ["84740"] },
            ],
            prizes: [
                50000000,
                2000000,
                200000,
                4000,
                2000,
                200,
                200,
                40,
                40,
            ],
        }
    };


    getLotteryIdentifierScemeList(date: Date): { name: string; regex: RegExp; }[] | null {
        return this.lotteryScheme;
    }


    getResultScheet(lotteryName: string, date: Date): ResultSheetEntity | null {
        if (lotteryName == "AdaSampatha") return this.adaSampathaResultSheet;
        else if (lotteryName == "AdaKotipathi") return this.adaKotipathiResultScheet;
        else if (lotteryName == "SupiriDhanaSampatha") return this.supiriDhanaSampathaResultSheet;
        else if (lotteryName == "Jayodha") return this.jayodhaResultScheet;
        else if (lotteryName == "Kapruka") return this.kaprukaResultScheet;
        else if (lotteryName == "SuperBall") return this.superBallResultSheet;
        else if (lotteryName == "Hadahana") return this.hadahanaResultSheet;
        else if (lotteryName == "DhanaNidhanaya") return this.dhanaNidhanayaResultSheet;
        else if (lotteryName == "MegaPower") return this.megaPowerResultScheet;
        else if (lotteryName == "Mahajana") return this.mahajanaSampathaResultSheet;
        else if (lotteryName == "Govisetha") return this.govisethaResultSheet;
        else if (lotteryName == "LagnaWasana") return this.lagnaWasanaResultSheet;
        else if (lotteryName == "Shanida") return this.shanidaResultSheet;
        return this.adaKotipathiResultScheet;
    }
}
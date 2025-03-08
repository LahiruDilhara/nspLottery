import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import AdaKotipathiStrategy from "../../../src/business/strategies/adaKotipathiStrategy";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";


describe("superBallStrategy", () => {
    let strategy: ILotteryStrategy;
    let resultSheet: ResultSheetEntity;
    let qrCode: string
    let lotteryData: LotteryDataEntity;
    let qrTokens: string[]
    let lotteryResult: LotteryResultEntity;

    function testWithResults(lotteryNumbers: string[], symbole: string[], expectedValue: number, matchedMainNumbers: { symbole: string, matched: boolean }[], symboles: { symbole: string, matched: boolean }[]) {
        lotteryData.numbers = lotteryNumbers;
        lotteryData.symboles = symbole;

        lotteryResult.totalWinMainPrice = expectedValue;
        lotteryResult.matchedMainNumbers = matchedMainNumbers;
        lotteryResult.matchedMainSymboles = symboles;

        // Action
        const result = strategy.checkTheResult(resultSheet.results, lotteryData);

        // Assert
        expect(result).toEqual(lotteryResult);
    }

    beforeEach(() => {
        strategy = new AdaKotipathiStrategy();
        resultSheet = {
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
        qrCode = "SUPER BALL 2707 2025&01&31 2707641674765705 05 20 27 64 Q 27520 www.dlb.lk";
        lotteryData = {
            barcode: "2707641674765705",
            drawNo: "2707",
            symboles: ["Q"],
            numbers: ["05", "20", "27", "64"],
            specialSymboles: [
                { category: "first", symboles: ["27520"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 50000000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "05",
                    matched: true
                },
                {
                    symbole: "20",
                    matched: true
                },
                {
                    symbole: "27",
                    matched: true
                },
                {
                    symbole: "64",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "Q",
                    matched: true
                }
            ],
            matchedSpecialSymboles: [
                {
                    category: "first",
                    symboles: [
                        {
                            matched: true,
                            symbole: "27520"
                        }
                    ],
                    gift: "50000",
                    matched: true
                }
            ]
        }
    })


    test("should parse the qr code and returns the LotteryDataEntity with parsed data", () => {
        // Action
        const result = strategy.parseQRTokens(qrTokens, resultSheet.qrIndexes);

        // Assert
        expect(lotteryData).toEqual(result);
    })

    test("should give the correct results for the parsed data", () => {
        // Action
        const result = strategy.checkTheResult(resultSheet.results, lotteryData);

        // Assert
        expect(result).toEqual(lotteryResult)
    })

    test("should give the main win prize as 0 when no number nor symbole match", () => {
        // Arrange
        const lotteryNumbers = ["06", "21", "28", "65"]
        const symbole = ["R"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "06",
                matched: false
            },
            {
                symbole: "21",
                matched: false
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "R",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["05", "21", "28", "65"]
        const symbole = ["R"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "21",
                matched: false
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "R",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only the symbole match", () => {
        // Arrange
        const lotteryNumbers = ["06", "21", "28", "65"]
        const symbole = ["Q"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "06",
                matched: false
            },
            {
                symbole: "21",
                matched: false
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Q",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when one number and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["05", "21", "28", "65"]
        const symbole = ["Q"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "21",
                matched: false
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Q",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "28", "65"]
        const symbole = ["R"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "R",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when two numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "28", "65"]
        const symbole = ["Q"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "28",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Q",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 4000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "27", "65"]
        const symbole = ["R"]
        const expectedValue = 4000
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "27",
                matched: true
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "R",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200000 when three numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "27", "65"]
        const symbole = ["Q"]
        const expectedValue = 200000
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "27",
                matched: true
            },
            {
                symbole: "65",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Q",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "27", "64"]
        const symbole = ["R"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "27",
                matched: true
            },
            {
                symbole: "64",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "R",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 50000000 when four numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["05", "20", "27", "64"]
        const symbole = ["Q"]
        const expectedValue = 50000000
        const resultNumbers = [
            {
                symbole: "05",
                matched: true
            },
            {
                symbole: "20",
                matched: true
            },
            {
                symbole: "27",
                matched: true
            },
            {
                symbole: "64",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "Q",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
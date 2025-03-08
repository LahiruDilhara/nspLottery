import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import AdaSampathaStrategy from "../../../src/business/strategies/adaSampathaStrategy";
import Tokenizer from "../../../src/core/utils/tokenizer";

describe("adaSampathaStrategy", () => {
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
        strategy = new AdaSampathaStrategy();
        resultSheet = {
            date: new Date("2025-01-27"),
            name: "Ada Sampatha",
            qrIndexes: {
                drawNo: 2,
                barCode: 4,
                numbers: [6, 7, 8],
                symboles: [5],
                tokensLength: 11,
                specialSymboles: [
                    { category: "first", indexes: [9] }
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
                    { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
                ]
            }
        };
        qrCode = "Ada Sampatha 0310 02.02.2025 086003100387491 F 93 668 5822 684656 http>&&r.nlb.lk&086003100387491936685822F";
        lotteryData = {
            barcode: "086003100387491",
            drawNo: "0310",
            symboles: ["F"],
            numbers: ["93", "668", "5822"],
            specialSymboles: [
                { category: "first", symboles: ["684656"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 250000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "93",
                    matched: true
                },
                {
                    symbole: "668",
                    matched: true
                },
                {
                    symbole: "5822",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "F",
                    matched: true
                }
            ],
            matchedSpecialSymboles: [
                {
                    category: "first",
                    symboles: [
                        {
                            matched: true,
                            symbole: "684656"
                        }
                    ],
                    gift: "100000",
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
        const lotteryNumbers = ["94", "669", "5824"]
        const symbole = ["G"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "669",
                matched: false
            },
            {
                symbole: "5824",
                matched: false
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 80 when only symbole match", () => {
        // Arrange
        const lotteryNumbers = ["94", "669", "5824"]
        const symbole = ["F"]
        const expectedValue = 80
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "669",
                matched: false
            },
            {
                symbole: "5824",
                matched: false
            },
        ]
        const symboles = [
            {
                symbole: "F",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 1000 when first number match", () => {
        // Arrange
        const lotteryNumbers = ["93", "669", "5824"]
        const symbole = ["G"]
        const expectedValue = 1000
        const resultNumbers = [
            {
                symbole: "93",
                matched: true,
            },
            {
                symbole: "669",
                matched: false
            },
            {
                symbole: "5824",
                matched: false
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 4000 when second number match", () => {
        // Arrange
        const lotteryNumbers = ["94", "668", "5824"]
        const symbole = ["G"]
        const expectedValue = 4000
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "668",
                matched: true
            },
            {
                symbole: "5824",
                matched: false
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 5000 when first and second numbers match", () => {
        // Arrange
        const lotteryNumbers = ["93", "668", "5824"]
        const symbole = ["G"]
        const expectedValue = 5000
        const resultNumbers = [
            {
                symbole: "93",
                matched: true,
            },
            {
                symbole: "668",
                matched: true
            },
            {
                symbole: "5824",
                matched: false
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 50000 when third number match", () => {
        // Arrange
        const lotteryNumbers = ["94", "669", "5822"]
        const symbole = ["G"]
        const expectedValue = 50000
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "669",
                matched: false
            },
            {
                symbole: "5822",
                matched: true
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 51000 when third and first numbers match", () => {
        // Arrange
        const lotteryNumbers = ["93", "669", "5822"]
        const symbole = ["G"]
        const expectedValue = 51000
        const resultNumbers = [
            {
                symbole: "93",
                matched: true,
            },
            {
                symbole: "669",
                matched: false
            },
            {
                symbole: "5822",
                matched: true
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 54000 when third and second numbers match", () => {
        // Arrange
        const lotteryNumbers = ["94", "668", "5822"]
        const symbole = ["G"]
        const expectedValue = 54000
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "668",
                matched: true
            },
            {
                symbole: "5822",
                matched: true
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 55000 when third, first and second numbers match", () => {
        // Arrange
        const lotteryNumbers = ["93", "668", "5822"]
        const symbole = ["G"]
        const expectedValue = 55000
        const resultNumbers = [
            {
                symbole: "93",
                matched: true,
            },
            {
                symbole: "668",
                matched: true
            },
            {
                symbole: "5822",
                matched: true
            },
        ]
        const symboles = [
            {
                symbole: "G",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 250000 when third and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["94", "668", "5822"]
        const symbole = ["F"]
        const expectedValue = 250000
        const resultNumbers = [
            {
                symbole: "94",
                matched: false,
            },
            {
                symbole: "668",
                matched: true
            },
            {
                symbole: "5822",
                matched: true
            },
        ]
        const symboles = [
            {
                symbole: "F",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

})
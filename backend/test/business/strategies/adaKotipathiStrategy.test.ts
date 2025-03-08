import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import AdaKotipathiStrategy from "../../../src/business/strategies/adaKotipathiStrategy";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";


describe("adaKotipathiStrategy", () => {
    let strategy: ILotteryStrategy;
    let adaKotipathiResultScheet: ResultSheetEntity;
    let adaKotipathiQRCode: string
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
        const result = strategy.checkTheResult(adaKotipathiResultScheet.results, lotteryData);

        // Assert
        expect(result).toEqual(lotteryResult);
    }

    beforeEach(() => {
        strategy = new AdaKotipathiStrategy();
        adaKotipathiResultScheet = {
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
        adaKotipathiQRCode = "ADA KOTIPATHI 2529 2025&01&27 2529129776598008 01 18 70 75 G 684656 www.dlb.lk";
        lotteryData = {
            barcode: "2529129776598008",
            drawNo: "2529",
            symboles: ["G"],
            numbers: ["01", "18", "70", "75"],
            specialSymboles: [
                { category: "first", symboles: ["684656"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(adaKotipathiQRCode);
        lotteryResult = {
            totalWinMainPrice: 50000000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "01",
                    matched: true,
                },
                {
                    symbole: "18",
                    matched: true
                },
                {
                    symbole: "70",
                    matched: true
                },
                {
                    symbole: "75",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "G",
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
        const result = strategy.parseQRTokens(qrTokens, adaKotipathiResultScheet.qrIndexes);

        // Assert
        expect(lotteryData).toEqual(result);
    })

    test("should give the correct results for the parsed data", () => {
        // Action
        const result = strategy.checkTheResult(adaKotipathiResultScheet.results, lotteryData);

        // Assert
        expect(result).toEqual(lotteryResult)
    })

    test("should give the main win prize as 0 when no number nor symbole match", () => {
        // Arrange
        const lotteryNumbers = ["02", "71", "19", "74"]
        const symbole = ["H"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "02",
                matched: false,
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "H",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 40 when only symbole match", () => {
        // Arrange
        const lotteryNumbers = ["02", "71", "19", "74"]
        const symbole = ["G"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "02",
                matched: false,
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "G",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["02", "70", "19", "74"]
        const symbole = ["H"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "02",
                matched: false,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "H",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when one number and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["02", "70", "19", "74"]
        const symbole = ["G"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "02",
                matched: false,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "G",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "19", "74"]
        const symbole = ["H"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "H",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when two numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "19", "74"]
        const symbole = ["G"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "19",
                matched: false
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "G",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 4000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "18", "74"]
        const symbole = ["H"]
        const expectedValue = 4000
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "18",
                matched: true
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "H",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 200000 when three numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "18", "74"]
        const symbole = ["G"]
        const expectedValue = 200000
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "18",
                matched: true
            },
            {
                symbole: "74",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "G",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 2000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "18", "75"]
        const symbole = ["H"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "18",
                matched: true
            },
            {
                symbole: "75",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "H",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 50000000 when four numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["01", "70", "18", "75"]
        const symbole = ["G"]
        const expectedValue = 50000000
        const resultNumbers = [
            {
                symbole: "01",
                matched: true,
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "18",
                matched: true
            },
            {
                symbole: "75",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "G",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
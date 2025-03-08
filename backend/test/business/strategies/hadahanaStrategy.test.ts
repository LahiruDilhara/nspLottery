import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import AdaKotipathiStrategy from "../../../src/business/strategies/adaKotipathiStrategy";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";


describe("adaKotipathiStrategy", () => {
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
        qrCode = "Handaha 1042    2025&01&31  085010420464898 SAJ 21  34  36  45  91738   10          http>&&r.nlb.lk&085010420464898SAJ213436459173810";
        lotteryData = {
            barcode: "085010420464898",
            drawNo: "1042",
            symboles: ["SAJ"],
            numbers: ["21", "34", "36", "45"],
            specialSymboles: [
                { category: "first", symboles: ["91738"] },
                { category: "second", symboles: ["10"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 3000000,
            matchedCategoryCount: 2,
            matchedMainNumbers: [
                {
                    symbole: "21",
                    matched: true
                },
                {
                    symbole: "34",
                    matched: true
                },
                {
                    symbole: "36",
                    matched: true
                },
                {
                    symbole: "45",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "SAJ",
                    matched: true
                }
            ],
            matchedSpecialSymboles: [
                {
                    category: "first",
                    symboles: [
                        {
                            matched: true,
                            symbole: "91738"
                        }
                    ],
                    gift: "50000",
                    matched: true
                },
                {
                    category: "second",
                    symboles: [
                        {
                            matched: true,
                            symbole: "10"
                        }
                    ],
                    gift: "40",
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
        const lotteryNumbers = ["22", "35", "37", "46"]
        const symbole = ["HELLO"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "22",
                matched: false
            },
            {
                symbole: "35",
                matched: false
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "HELLO",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only symbole match", () => {
        // Arrange
        const lotteryNumbers = ["22", "35", "37", "46"]
        const symbole = ["SAJ"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "22",
                matched: false
            },
            {
                symbole: "35",
                matched: false
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "SAJ",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["21", "35", "37", "46"]
        const symbole = ["HELLO"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "35",
                matched: false
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "HELLO",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 120 when one number and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["21", "35", "37", "46"]
        const symbole = ["SAJ"]
        const expectedValue = 120
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "35",
                matched: false
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "SAJ",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "37", "46"]
        const symbole = ["HELLO"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "HELLO",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 500 when two numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "37", "46"]
        const symbole = ["SAJ"]
        const expectedValue = 500
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "37",
                matched: false
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "SAJ",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "36", "46"]
        const symbole = ["HELLO"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "36",
                matched: true
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "HELLO",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 25000 when three numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "36", "46"]
        const symbole = ["SAJ"]
        const expectedValue = 25000
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "36",
                matched: true
            },
            {
                symbole: "46",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "SAJ",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 1000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "36", "45"]
        const symbole = ["HELLO"]
        const expectedValue = 1000000
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "36",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "HELLO",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 3000000 when four numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["21", "34", "36", "45"]
        const symbole = ["SAJ"]
        const expectedValue = 3000000
        const resultNumbers = [
            {
                symbole: "21",
                matched: true
            },
            {
                symbole: "34",
                matched: true
            },
            {
                symbole: "36",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "SAJ",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
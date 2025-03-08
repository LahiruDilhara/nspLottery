import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import AdaKotipathiStrategy from "../../../src/business/strategies/adaKotipathiStrategy";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import DhanaNidhanayaStrategy from "../../../src/business/strategies/dhanaNidhanayaStrategy";


describe("dhanaNidhanayaStrategy", () => {
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
        strategy = new DhanaNidhanayaStrategy();
        resultSheet = {
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
        qrCode = "Dhana Nidhanaya 1763 A 17 49 70 72 J 69497 2025&01&31 084017630186876 https>&&r.nlb.lk&084017630186876A17497072J69497";
        lotteryData = {
            barcode: "084017630186876",
            drawNo: "1763",
            symboles: ["A"],
            numbers: ["17", "49", "70", "72"],
            specialSymboles: [
                { category: "first", symboles: ["J"] },
                { category: "second", symboles: ["69497"] },
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 80000000,
            matchedCategoryCount: 2,
            matchedMainNumbers: [
                {
                    symbole: "17",
                    matched: true
                },
                {
                    symbole: "49",
                    matched: true
                },
                {
                    symbole: "70",
                    matched: true
                },
                {
                    symbole: "72",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "A",
                    matched: true
                }
            ],
            matchedSpecialSymboles: [
                {
                    category: "first",
                    symboles: [
                        {
                            matched: true,
                            symbole: "J"
                        }
                    ],
                    gift: "40",
                    matched: true
                },
                {
                    category: "second",
                    symboles: [
                        {
                            matched: true,
                            symbole: "69497"
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
        const lotteryNumbers = ["18", "50", "71", "73"]
        const symbole = ["B"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "18",
                matched: false
            },
            {
                symbole: "50",
                matched: false
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only the symbole match", () => {
        // Arrange
        const lotteryNumbers = ["18", "50", "71", "73"]
        const symbole = ["A"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "18",
                matched: false
            },
            {
                symbole: "50",
                matched: false
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["17", "50", "71", "73"]
        const symbole = ["B"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "50",
                matched: false
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 120 when one number and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["17", "50", "71", "73"]
        const symbole = ["A"]
        const expectedValue = 120
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "50",
                matched: false
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "71", "73"]
        const symbole = ["B"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when two numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "71", "73"]
        const symbole = ["A"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "71",
                matched: false
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 6000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "70", "73"]
        const symbole = ["B"]
        const expectedValue = 6000
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200000 when three numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "70", "73"]
        const symbole = ["A"]
        const expectedValue = 200000
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "73",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "70", "72"]
        const symbole = ["B"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "72",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 80000000 when four numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["17", "49", "70", "72"]
        const symbole = ["A"]
        const expectedValue = 80000000
        const resultNumbers = [
            {
                symbole: "17",
                matched: true
            },
            {
                symbole: "49",
                matched: true
            },
            {
                symbole: "70",
                matched: true
            },
            {
                symbole: "72",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
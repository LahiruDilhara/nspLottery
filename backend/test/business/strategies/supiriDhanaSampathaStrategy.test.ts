import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import SupiriDhanaSampathaStrategy from "../../../src/business/strategies/supiriDhanaSampathaStrategy";


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
        strategy = new SupiriDhanaSampathaStrategy();
        adaKotipathiResultScheet = {
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
        adaKotipathiQRCode = "0437    2025.01.27  0437/663262529/0/05 Z   5   1   6   0   2   6   71401   580         www.dlb.lk";
        lotteryData = {
            barcode: "0437/663262529/0/05",
            drawNo: "0437",
            symboles: ["Z"],
            numbers: ["5", "1", "6", "0", "2", "6"],
            specialSymboles: [
                { category: "first", symboles: ["71401"] },
                { category: "second", symboles: ["580"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(adaKotipathiQRCode);
        lotteryResult = {
            totalWinMainPrice: 20000000,
            matchedCategoryCount: 2,
            matchedMainNumbers: [
                {
                    symbole: "5",
                    matched: true
                },
                {
                    symbole: "1",
                    matched: true
                },
                {
                    symbole: "6",
                    matched: true
                },
                {
                    symbole: "0",
                    matched: true
                },
                {
                    symbole: "2",
                    matched: true
                },
                {
                    symbole: "6",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "Z",
                    matched: true
                }
            ],
            matchedSpecialSymboles: [
                {
                    category: "first",
                    symboles: [
                        {
                            matched: true,
                            symbole: "71401"
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
                            symbole: "580"
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
        const lotteryNumbers = ["6", "1", "6", "0", "2", "7"]
        const symbole = ["A"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "7",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 0 when no number nor symbole match", () => {
        // Arrange
        const lotteryNumbers = ["6", "2", "7", "1", "3", "7"]
        const symbole = ["Z"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "2",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 40 when one number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "2", "7", "1", "3", "7"]
        const symbole = ["A"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 40 when one number match from end", () => {
        // Arrange
        const lotteryNumbers = ["5", "2", "7", "1", "3", "6"]
        const symbole = ["A"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 120 when two number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "7", "1", "3", "6"]
        const symbole = ["A"]
        const expectedValue = 120
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "7",
                matched: false
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 200 when three number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "6", "1", "3", "6"]
        const symbole = ["A"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 200 when two number match from end", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "7", "1", "2", "6"]
        const symbole = ["A"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "7",
                matched: false
            },
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 500 when numbers match in any order", () => {
        // Arrange
        const lotteryNumbers = ["1", "0", "5", "2", "6", "6"]
        const symbole = ["A"]
        const expectedValue = 500
        const resultNumbers = [
            {
                symbole: "1",
                matched: false
            },
            {
                symbole: "0",
                matched: false
            },
            {
                symbole: "5",
                matched: false
            },
            {
                symbole: "2",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 2000 when four number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "6", "0", "3", "7"]
        const symbole = ["A"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "3",
                matched: false
            },
            {
                symbole: "7",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 2000 when three number match from end", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "5", "0", "2", "6"]
        const symbole = ["A"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "5",
                matched: false
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 20000 when four number match from end", () => {
        // Arrange
        const lotteryNumbers = ["5", "2", "6", "0", "2", "6"]
        const symbole = ["A"]
        const expectedValue = 20000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: false
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 100000 when five number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "6", "0", "2", "7"]
        const symbole = ["A"]
        const expectedValue = 100000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "7",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 100000 when five number match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "1", "6", "0", "2", "6"]
        const symbole = ["A"]
        const expectedValue = 100000
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })


    test("should give the main win prize as 2500000 when all number match", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "6", "0", "2", "6"]
        const symbole = ["A"]
        const expectedValue = 2500000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 20000000 when all numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["5", "1", "6", "0", "2", "6"]
        const symbole = ["Z"]
        const expectedValue = 20000000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "1",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            },
            {
                symbole: "0",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            },
            {
                symbole: "6",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
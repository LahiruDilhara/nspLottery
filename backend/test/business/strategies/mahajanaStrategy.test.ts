import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import MahajanaStrategy from "../../../src/business/strategies/mahajanaStrategy";


describe("mahajanaStrategy", () => {
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
        strategy = new MahajanaStrategy();
        resultSheet = {
            date: new Date("2025-01-31"),
            name: "Mahajana Sampatha",
            qrIndexes: {
                barCode: 4,
                drawNo: 2,
                numbers: [6],
                symboles: [5],
                tokensLength: 8,
                specialSymboles: [
                    { category: "first", indexes: [7] }
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
                    { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
                ]
            }
        };
        qrCode = "Mahajana Sampatha 5733 31.01.2025 080057330909545 W 578752 684656 http>&&r.nlb.lk&080057330909545W578752";
        lotteryData = {
            barcode: "080057330909545",
            drawNo: "5733",
            symboles: ["W"],
            numbers: ["5", "7", "8", "7", "5", "2"],
            specialSymboles: [
                { category: "first", symboles: ["684656"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 20000000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "5",
                    matched: true
                },
                {
                    symbole: "7",
                    matched: true
                },
                {
                    symbole: "8",
                    matched: true
                },
                {
                    symbole: "7",
                    matched: true
                },
                {
                    symbole: "5",
                    matched: true
                },
                {
                    symbole: "2",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "W",
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
        const lotteryNumbers = ["6", "8", "9", "8", "6", "3"]
        const symbole = ["X"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
    test("should give the main win prize as 40 when symbole matched", () => {
        // Arrange
        const lotteryNumbers = ["6", "8", "9", "8", "6", "3"]
        const symbole = ["W"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "W",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "8", "9", "8", "6", "3"]
        const symbole = ["X"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "8", "9", "8", "6", "2"]
        const symbole = ["X"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 80 when two numbers match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "9", "8", "6", "3"]
        const symbole = ["X"]
        const expectedValue = 80
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "8", "9", "8", "5", "2"]
        const symbole = ["X"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when three numbers match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "8", "8", "6", "3"]
        const symbole = ["X"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when four numbers match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "8", "7", "6", "3"]
        const symbole = ["X"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when three numbers match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "8", "9", "7", "5", "2"]
        const symbole = ["X"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "9",
                matched: false
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 15000 when four numbers match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "8", "8", "7", "5", "2"]
        const symbole = ["X"]
        const expectedValue = 15000
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "8",
                matched: false
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 100000 when five numbers match from start", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "8", "7", "5", "3"]
        const symbole = ["X"]
        const expectedValue = 100000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "3",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 100000 when five numbers match from end", () => {
        // Arrange
        const lotteryNumbers = ["6", "7", "8", "7", "5", "2"]
        const symbole = ["X"]
        const expectedValue = 100000
        const resultNumbers = [
            {
                symbole: "6",
                matched: false
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2500000 when six numbers match from end", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "8", "7", "5", "2"]
        const symbole = ["X"]
        const expectedValue = 2500000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "X",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 20000000 when six numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["5", "7", "8", "7", "5", "2"]
        const symbole = ["W"]
        const expectedValue = 20000000
        const resultNumbers = [
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "8",
                matched: true
            },
            {
                symbole: "7",
                matched: true
            },
            {
                symbole: "5",
                matched: true
            },
            {
                symbole: "2",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "W",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
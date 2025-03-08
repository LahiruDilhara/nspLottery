import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import JayodhaStrategy from "../../../src/business/strategies/jayodhaStrategy";


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
        strategy = new JayodhaStrategy();
        adaKotipathiResultScheet = {
            date: new Date("2025-01-29"),
            name: "Jayodha",
            qrIndexes: {
                barCode: 3,
                drawNo: 1,
                numbers: [4, 5, 6, 7],
                symboles: [8],
                tokensLength: 10,
                specialSymboles: [
                    { category: "first", indexes: [9] }
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
                    { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
                ]
            }
        };
        adaKotipathiQRCode = "JAYODA 2099 2025&01&29 2099727212786806 04 26 31 65 O 684656 www.dlb.lk";
        lotteryData = {
            barcode: "2099727212786806",
            drawNo: "2099",
            symboles: ["O"],
            numbers: ["04", "26", "31", "65"],
            specialSymboles: [
                { category: "first", symboles: ["684656"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(adaKotipathiQRCode);
        lotteryResult = {
            totalWinMainPrice: 20000000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "04",
                    matched: true
                },
                {
                    symbole: "26",
                    matched: true
                },
                {
                    symbole: "31",
                    matched: true
                },
                {
                    symbole: "65",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "O",
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
        const lotteryNumbers = ["05", "27", "32", "66"]
        const symbole = ["P"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "05",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "P",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when symbole match", () => {
        // Arrange
        const lotteryNumbers = ["05", "27", "32", "66"]
        const symbole = ["O"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "05",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "O",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["04", "27", "32", "66"]
        const symbole = ["P"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "P",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 80 when one number and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["04", "27", "32", "66"]
        const symbole = ["O"]
        const expectedValue = 80
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "O",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["04", "26", "32", "66"]
        const symbole = ["P"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "26",
                matched: true
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "P",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when two numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["04", "26", "32", "66"]
        const symbole = ["O"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "26",
                matched: true
            },
            {
                symbole: "32",
                matched: false
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "O",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 4000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["04", "26", "31", "66"]
        const symbole = ["P"]
        const expectedValue = 4000
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "26",
                matched: true
            },
            {
                symbole: "31",
                matched: true
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "P",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 100000 when three numbers and symbole match", () => {
        // Arrange
        const lotteryNumbers = ["04", "26", "31", "66"]
        const symbole = ["O"]
        const expectedValue = 100000
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "26",
                matched: true
            },
            {
                symbole: "31",
                matched: true
            },
            {
                symbole: "66",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "O",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["04", "26", "31", "65"]
        const symbole = ["P"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "04",
                matched: true
            },
            {
                symbole: "26",
                matched: true
            },
            {
                symbole: "31",
                matched: true
            },
            {
                symbole: "65",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "P",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
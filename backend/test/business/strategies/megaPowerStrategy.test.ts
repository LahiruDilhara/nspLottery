import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import MegaPowerStrategy from "../../../src/business/strategies/megaPower";


describe("megaPowerStrategy", () => {
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
        strategy = new MegaPowerStrategy();
        resultSheet = {
            date: new Date("2025-01-31"),
            name: "Mega Power",
            qrIndexes: {
                barCode: 10,
                drawNo: 2,
                numbers: [5, 6, 7, 8],
                symboles: [3, 4],
                tokensLength: 13,
                specialSymboles: [
                    { category: "first", indexes: [11] }
                ]
            },
            results: {
                numbers: ["44", "45", "63", "75"],
                symboles: ["Z", "25"],
                specialSymboles: [
                    { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
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
        qrCode = "Mega Power 2081 Z 25 44 45 63 75 2025&01&31 083020810268010 684656 https>&&r.nlb.lk&083020810268010Z2544456375";
        lotteryData = {
            barcode: "083020810268010",
            drawNo: "2081",
            symboles: ["Z", "25"],
            numbers: ["44", "45", "63", "75"],
            specialSymboles: [
                { category: "first", symboles: ["684656"] }
            ]
        };
        qrTokens = Tokenizer.tokenizeStringBySpaces(qrCode);
        lotteryResult = {
            totalWinMainPrice: 150000000,
            matchedCategoryCount: 1,
            matchedMainNumbers: [
                {
                    symbole: "44",
                    matched: true
                },
                {
                    symbole: "45",
                    matched: true
                },
                {
                    symbole: "63",
                    matched: true
                },
                {
                    symbole: "75",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "Z",
                    matched: true
                },
                {
                    symbole: "25",
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
        const lotteryNumbers = ["46", "47", "65", "77"]
        const symbole = ["A", "27"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "46",
                matched: false
            },
            {
                symbole: "47",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only the super number matches", () => {
        // Arrange
        const lotteryNumbers = ["46", "47", "65", "77"]
        const symbole = ["A", "25"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "46",
                matched: false
            },
            {
                symbole: "47",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "25",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["46", "47", "65", "77"]
        const symbole = ["Z", "27"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "46",
                matched: false
            },
            {
                symbole: "47",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when one number match", () => {
        // Arrange
        const lotteryNumbers = ["44", "47", "65", "77"]
        const symbole = ["A", "27"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "47",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when one number and symbole matches", () => {
        // Arrange
        const lotteryNumbers = ["44", "47", "65", "77"]
        const symbole = ["Z", "27"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "47",
                matched: false
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 240 when two numbers and super number match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "65", "77"]
        const symbole = ["A", "25"]
        const expectedValue = 240
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "25",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when two numbers match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "65", "77"]
        const symbole = ["A", "27"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when two numbers and one symbole match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "65", "77"]
        const symbole = ["Z", "27"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "65",
                matched: false
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 5000 when three numbers match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "63", "77"]
        const symbole = ["A", "27"]
        const expectedValue = 5000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "63",
                matched: true
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200000 when three numbers and one symbole match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "63", "77"]
        const symbole = ["Z", "27"]
        const expectedValue = 200000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "63",
                matched: true
            },
            {
                symbole: "77",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000000 when four numbers match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "63", "75"]
        const symbole = ["A", "27"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "63",
                matched: true
            },
            {
                symbole: "75",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: false
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 10000000 when four numbers and one symbole match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "63", "75"]
        const symbole = ["Z", "27"]
        const expectedValue = 10000000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "63",
                matched: true
            },
            {
                symbole: "75",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "27",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 150000000 when four numbers and two symboles match", () => {
        // Arrange
        const lotteryNumbers = ["44", "45", "63", "75"]
        const symbole = ["Z", "25"]
        const expectedValue = 150000000
        const resultNumbers = [
            {
                symbole: "44",
                matched: true
            },
            {
                symbole: "45",
                matched: true
            },
            {
                symbole: "63",
                matched: true
            },
            {
                symbole: "75",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "Z",
                matched: true
            },
            {
                symbole: "25",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

})
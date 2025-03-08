import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultSheetEntity from "../../../src/business/entities/ResultSheetEntity";
import LotteryDataEntity from "../../../src/business/entities/LotteryDataEntity";
import Tokenizer from "../../../src/core/utils/tokenizer";
import ILotteryStrategy from "../../../src/business/interfaces/ILotteryStrategy";
import LotteryResultEntity from "../../../src/business/entities/LotteryResultEntity";
import KaprukaStrategy from "../../../src/business/strategies/kaprukaStrategy";


describe("kaprukaStrategy", () => {
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
        strategy = new KaprukaStrategy();
        resultSheet = {
            date: new Date("2025-01-29"),
            name: "Kapruka",
            qrIndexes: {
                barCode: 3,
                drawNo: 1,
                numbers: [4, 5, 6, 7],
                symboles: [8, 9],
                tokensLength: 11,
                specialSymboles: [
                    { category: "first", indexes: [10] }
                ]
            },
            results: {
                numbers: ["02", "41", "50", "59"],
                symboles: ["A", "40"],
                specialSymboles: [
                    { category: "first", description: "regular", gift: "100000", method: "OneToOne", results: ["684656"] }
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
        qrCode = "KAPRUKA 1883 2025&01&31 1883094197532707 02 41 50 59 A 40 684656 WWW.DLB.LK";
        lotteryData = {
            barcode: "1883094197532707",
            drawNo: "1883",
            symboles: ["A", "40"],
            numbers: ["02", "41", "50", "59"],
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
                    symbole: "02",
                    matched: true
                },
                {
                    symbole: "41",
                    matched: true
                },
                {
                    symbole: "50",
                    matched: true
                },
                {
                    symbole: "59",
                    matched: true
                }
            ],
            matchedMainSymboles: [
                {
                    symbole: "A",
                    matched: true
                },
                {
                    symbole: "40",
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
        const lotteryNumbers = ["03", "42", "51", "60"]
        const symbole = ["B", "41"]
        const expectedValue = 0
        const resultNumbers = [
            {
                symbole: "03",
                matched: false
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when 1 number match", () => {
        // Arrange
        const lotteryNumbers = ["02", "42", "51", "60"]
        const symbole = ["B", "41"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    
    test("should give the main win prize as 40 when only the super number match", () => {
        // Arrange
        const lotteryNumbers = ["03", "42", "51", "60"]
        const symbole = ["B", "40"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "03",
                matched: false
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "40",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 40 when only the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["03", "42", "51", "60"]
        const symbole = ["A", "41"]
        const expectedValue = 40
        const resultNumbers = [
            {
                symbole: "03",
                matched: false
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 80 when only the english letter and super number match", () => {
        // Arrange
        const lotteryNumbers = ["03", "42", "51", "60"]
        const symbole = ["A", "40"]
        const expectedValue = 80
        const resultNumbers = [
            {
                symbole: "03",
                matched: false
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "40",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when 1 number and the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["02", "42", "51", "60"]
        const symbole = ["A", "41"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "42",
                matched: false
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200 when 2 numbers match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "51", "60"]
        const symbole = ["B", "41"]
        const expectedValue = 200
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000 when 2 numbers and the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "51", "60"]
        const symbole = ["A", "41"]
        const expectedValue = 2000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "51",
                matched: false
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 4000 when 3 numbers match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "60"]
        const symbole = ["B", "41"]
        const expectedValue = 4000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 200000 when 3 numbers and the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "60"]
        const symbole = ["A", "41"]
        const expectedValue = 200000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "60",
                matched: false
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 2000000 when 4 numbers match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "59"]
        const symbole = ["B", "41"]
        const expectedValue = 2000000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "59",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 10000000 when 4 numbers and the super number match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "59"]
        const symbole = ["B", "40"]
        const expectedValue = 10000000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "59",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "B",
                matched: false
            },
            {
                symbole: "40",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 10000000 when 4 numbers and the english letter match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "59"]
        const symbole = ["A", "41"]
        const expectedValue = 10000000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "59",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "41",
                matched: false
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })

    test("should give the main win prize as 150000000 when 4 numbers, the english letter and the super number match", () => {
        // Arrange
        const lotteryNumbers = ["02", "41", "50", "59"]
        const symbole = ["A", "40"]
        const expectedValue = 150000000
        const resultNumbers = [
            {
                symbole: "02",
                matched: true
            },
            {
                symbole: "41",
                matched: true
            },
            {
                symbole: "50",
                matched: true
            },
            {
                symbole: "59",
                matched: true
            }
        ]
        const symboles = [
            {
                symbole: "A",
                matched: true
            },
            {
                symbole: "40",
                matched: true
            }
        ]

        testWithResults(lotteryNumbers, symbole, expectedValue, resultNumbers, symboles)
    })
})
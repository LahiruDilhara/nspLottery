import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultMatcher from "../../../src/business/strategies/ResultMatcher";
import { LotterySpecialSymbole, MatchSpecialSymbole, SpecialSymbole } from "../../../src/business/types/types";

describe("ResultMatcher", () => {
    let matcher: ResultMatcher;

    beforeEach(() => {
        matcher = new ResultMatcher();
    })


    test("should match in order and returns the status and match count", () => {
        // Arrange
        const wonSymboles: string[] = ["4", "w", "4", "10", "20"];
        const lotterySymboles: string[] = ["4", "w", "10", "4", "20"];
        const wonList: boolean[] = [true, true, false, false, true];

        // Action
        const result = matcher.matchAllInOrderDescrete(wonSymboles, lotterySymboles);

        // Assert
        expect(result.matchCount).toBe(3)
        expect(result.totalCount).toBe(5)
        expect(result.matchStatus.length).toBe(5)
        result.matchStatus.forEach((item, index) => {
            expect(item.symbole).toBe(lotterySymboles[index])
            expect(item.matched).toBe(wonList[index])
        })
    })

    test("should match in any order and returns the status and match count correctly", () => {
        // Arrange
        const wonSymboles: string[] = ["4", "w", "4", "10", "20"];
        const lotterySymboles: string[] = ["w", "10", "6", "11", "20"];
        const wonList: boolean[] = [true, true, false, false, true];

        // Action
        const result = matcher.matchAllAnyOrderDescrete(wonSymboles, lotterySymboles);

        // Assert
        expect(result.matchCount).toBe(3)
        expect(result.totalCount).toBe(5)
        expect(result.matchStatus.length).toBe(5)
        result.matchStatus.forEach((item, index) => {
            expect(item.symbole).toBe(lotterySymboles[index])
            expect(item.matched).toBe(wonList[index])
        })
    })

    test("should check the special symboles in one to one match method and give the result", () => {
        // Arrange
        const wonSpecialSymboles: SpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                description: "test description",
                method: "OneToOne",
                results: ["65456"]
            },
            {
                category: "category 2",
                gift: "car",
                description: "test description",
                method: "OneToOne",
                results: ["8564789"]
            },
        ]

        const lotterySpecialSymboles1: LotterySpecialSymbole[] = [
            {
                category: "category 1",
                symboles: ["65456"]
            },
            {
                category: "category 2",
                symboles: ["8564789"]
            },
            {
                category: "category 1",
                symboles: ["65488"]
            },
            {
                category: "category 2",
                symboles: ["65456"]
            },
        ]

        const trueResult: MatchSpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                matched: true,
                symboles: [
                    { symbole: "65456", matched: true }
                ]
            },
            {
                category: "category 2",
                gift: "car",
                matched: true,
                symboles: [
                    { symbole: "8564789", matched: true }
                ]
            },
            {
                category: "category 1",
                gift: "40000",
                matched: false,
                symboles: [
                    { symbole: "65488", matched: false }
                ]
            },
            {
                category: "category 2",
                gift: "car",
                matched: false,
                symboles: [
                    { symbole: "65456", matched: false }
                ]
            },
        ]

        // Action
        const symboleResult = matcher.checkSpecialSymboles(wonSpecialSymboles, lotterySpecialSymboles1)

        // Assert
        expect(symboleResult).toEqual(trueResult)
        expect(symboleResult.length).toEqual(4)
    })

    test("should check the special symboles in one to many match method and give the result", () => {
        // Arrange
        const wonSpecialSymboles: SpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                description: "test description",
                method: "OneToMany",
                results: ["65456"]
            },
            {
                category: "category 2",
                gift: "car",
                description: "test description",
                method: "OneToMany",
                results: ["8564789"]
            },
        ]

        const lotterySpecialSymboles1: LotterySpecialSymbole[] = [
            {
                category: "category 1",
                symboles: ["65456", "564773", "247475", "24204", "42474"]
            },
            {
                category: "category 2",
                symboles: ["12341234", "8564789", "23411", "5454641", "45484"]
            }
        ]

        const trueResult: MatchSpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                matched: true,
                symboles: [
                    { symbole: "65456", matched: true },
                    { symbole: "564773", matched: false },
                    { symbole: "247475", matched: false },
                    { symbole: "24204", matched: false },
                    { symbole: "42474", matched: false },
                ]
            },
            {
                category: "category 2",
                gift: "car",
                matched: true,
                symboles: [
                    { symbole: "12341234", matched: false },
                    { symbole: "8564789", matched: true },
                    { symbole: "23411", matched: false },
                    { symbole: "5454641", matched: false },
                    { symbole: "45484", matched: false },
                ]
            },
        ]

        // Action
        const symboleResult = matcher.checkSpecialSymboles(wonSpecialSymboles, lotterySpecialSymboles1)

        // Assert
        expect(symboleResult).toEqual(trueResult);
    })

    test("should check the special symboles in many to one match method and give the result", () => {
        // Arrange
        const wonSpecialSymboles: SpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                description: "test description",
                method: "ManyToOne",
                results: ["65456", "56474", "47278", "274758"]
            },
            {
                category: "category 2",
                gift: "car",
                description: "test description",
                method: "ManyToOne",
                results: ["8564789", "78845", "9874656", "452548"]
            },
        ]

        const lotterySpecialSymboles1: LotterySpecialSymbole[] = [
            {
                category: "category 1",
                symboles: ["65456"]
            },
            {
                category: "category 2",
                symboles: ["8564785"]
            }
        ]

        const trueResult: MatchSpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                matched: true,
                symboles: [
                    { symbole: "65456", matched: true },
                ]
            },
            {
                category: "category 2",
                gift: "car",
                matched: false,
                symboles: [
                    { symbole: "8564785", matched: false },
                ]
            },
        ]

        // Action
        const symboleResult = matcher.checkSpecialSymboles(wonSpecialSymboles, lotterySpecialSymboles1)

        // Assert
        expect(symboleResult).toEqual(trueResult);
    })


    test("should check the special symboles in many to many match method and give the result", () => {
        // Arrange
        const wonSpecialSymboles: SpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                description: "test description",
                method: "ManyToMany",
                results: ["65456", "56474", "47278", "274758"]
            },
            {
                category: "category 2",
                gift: "car",
                description: "test description",
                method: "ManyToMany",
                results: ["8564789", "78845", "9874656", "452548"]
            },
        ]

        const lotterySpecialSymboles1: LotterySpecialSymbole[] = [
            {
                category: "category 1",
                symboles: ["7845", "78745", "57586", "65456"]
            },
            {
                category: "category 2",
                symboles: ["78945", "75424", "8564799", "58686"]
            }
        ]

        const trueResult: MatchSpecialSymbole[] = [
            {
                category: "category 1",
                gift: "40000",
                matched: true,
                symboles: [
                    { symbole: "7845", matched: false },
                    { symbole: "78745", matched: false },
                    { symbole: "57586", matched: false },
                    { symbole: "65456", matched: true },
                ]
            },
            {
                category: "category 2",
                gift: "car",
                matched: false,
                symboles: [
                    { symbole: "78945", matched: false },
                    { symbole: "75424", matched: false },
                    { symbole: "8564799", matched: false },
                    { symbole: "58686", matched: false },
                ]
            },
        ]

        // Action
        const symboleResult = matcher.checkSpecialSymboles(wonSpecialSymboles, lotterySpecialSymboles1)

        // Assert
        expect(symboleResult).toEqual(trueResult);
    })
});
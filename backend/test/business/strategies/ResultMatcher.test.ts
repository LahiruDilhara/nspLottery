import { beforeEach, describe, test, expect, expectTypeOf } from "vitest";
import ResultMatcher from "../../../src/business/strategies/ResultMatcher";

describe("ResultMatcher", () => {
    let matcher: ResultMatcher;

    beforeEach(() => {
        matcher = new ResultMatcher();
    })


    test("should returns emtpty list if the input special symboles lists are emtpty ", () => {
        // Arrange
        const wonSpecialSymboles: [] = [];
        const lotteryResultSymboles: [] = [];

        // Action
        const result = matcher.checkSpecialSymboles(wonSpecialSymboles, lotteryResultSymboles);

        // Assert
        expect(result).empty
    })

    test("should ")
});
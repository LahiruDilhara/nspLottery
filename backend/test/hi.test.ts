import { describe, test, it, expect } from 'vitest';

describe("sample test", () => {
    it("should return true if the arguments are greater ", () => {
        // Arrange
        const a = 2;
        const b = 4;

        // Act
        const result = b > a;

        // Assert
        expect(result).toBe(true);
    })

    it("should return false if the arguments are lesser", () => {
        // Arrange
        const a = 2;
        const b = 4;

        // Act
        const result = b < a;

        // Assert
        expect(result).toBe(false);
    })
})
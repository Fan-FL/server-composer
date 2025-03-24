import { isPowerOfTwo, isValidateMemorySize } from "./memoryUtils";

describe("isPowerOfTwo", () => {
    it("should return true for powers of 2", () => {
        expect(isPowerOfTwo(1)).toBe(true);
        expect(isPowerOfTwo(2)).toBe(true);
        expect(isPowerOfTwo(4)).toBe(true);
        expect(isPowerOfTwo(1024)).toBe(true);
    });

    it("should return false for non-powers of 2", () => {
        expect(isPowerOfTwo(3)).toBe(false);
        expect(isPowerOfTwo(10)).toBe(false);
        expect(isPowerOfTwo(1025)).toBe(false);
    });
});

describe("isValidateMemorySize", () => {
    it("should return true for valid memory sizes", () => {
        expect(isValidateMemorySize(2048)).toEqual({ isValid: true });
        expect(isValidateMemorySize(8192)).toEqual({ isValid: true });
        expect(isValidateMemorySize(524288)).toEqual({ isValid: true });
    });

    it("should return false for invalid memory sizes", () => {
        expect(isValidateMemorySize(8388609)).toEqual({
            isValid: false,
            error: "Memory size must be between 2,048 and 8,388,608.",
        });
        expect(isValidateMemorySize(1024)).toEqual({
            isValid: false,
            error: "Memory size must be between 2,048 and 8,388,608.",
        });
        expect(isValidateMemorySize(4097)).toEqual({
            isValid: false,
            error: "Memory size must be a multiple of 1,024.",
        });
        expect(isValidateMemorySize(5120)).toEqual({
            isValid: false,
            error: "Memory size must be a multiple of 1,024, also must be a power of 2 (e.g., 2,048, 4,096, 8,192).",
        });
    });
});

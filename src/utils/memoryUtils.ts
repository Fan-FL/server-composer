export const isPowerOfTwo = (num: number): boolean => {
    return (num & (num - 1)) === 0;
};

export const isValidateMemorySize = (memorySize: number): { isValid: boolean; error?: string} => {
    if (memorySize > 8388608 || memorySize < 2048) {
        return {
            isValid: false,
            error: "Memory size must be between 2,048 and 8,388,608.",
        };
    }

    if (memorySize % 1024 !== 0) {
        return {
            isValid: false,
            error: "Memory size must be a multiple of 1,024.",
        };
    }

    if (!isPowerOfTwo(memorySize/1024)) {
        return {
            isValid: false,
            error: "Memory size must be a multiple of 1,024, also must be a power of 2 (e.g., 2,048, 4,096, 8,192).",
        };
    }

    return { isValid: true };
};

import { ConfigFormAction, configFormReducer } from "./ConfigFormReducer";
import { CPUS } from "../constants";
import { isValidateMemorySize } from "../utils/memoryUtils";
import { getServerModels } from "../utils/serverModelUtils";

jest.mock("../utils/memoryUtils", () => ({
    isValidateMemorySize: jest.fn()
}));

jest.mock("../utils/serverModelUtils", () => ({
    getServerModels: jest.fn()
}));

describe("configFormReducer", () => {
    const initialState = {
        cpu: CPUS.X86,
        memorySize: 4096,
        gpuAcceleratorCard: false,
        error: null,
        isFormValid: true,
        serverModels: null,
    };

    it("SET_CPU", () => {
        const action = { type: "SET_CPU", payload: CPUS.POWER };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.cpu).toBe(CPUS.POWER);
    });

    it("SET_MEMORY_SIZE", () => {
        const action = { type: "SET_MEMORY_SIZE", payload: 8192 };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.memorySize).toBe(8192);
    });

    it("SET_GPU_ACCELERATOR_CARD", () => {
        const action = { type: "SET_GPU_ACCELERATOR_CARD", payload: true };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.gpuAcceleratorCard).toBe(true);
    });

    it("VALIDATE_FORM with valid memory size", () => {
        (isValidateMemorySize as jest.Mock).mockReturnValue({ isValid: true });
        const action = { type: "VALIDATE_FORM" };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.isFormValid).toBe(true);
        expect(state.error).toBeNull();
    });

    it("VALIDATE_FORM with invalid memory size", () => {
        (isValidateMemorySize as jest.Mock).mockReturnValue({
            isValid: false,
            error: "some error",
        });
        const action = { type: "VALIDATE_FORM" };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.isFormValid).toBe(false);
        expect(state.error).toBe("some error");
    });

    it("UPDATE_SERVER_MODELS", () => {
        (getServerModels as jest.Mock).mockReturnValue(["abc", "def"]);
        const action = { type: "UPDATE_SERVER_MODELS" };
        const state = configFormReducer(initialState, action as ConfigFormAction);
        expect(state.serverModels).toEqual(["abc", "def"]);
    });
});

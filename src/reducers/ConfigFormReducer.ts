import { CPU } from "../types";
import { isValidateMemorySize } from "../utils/memoryUtils";
import { getServerModels } from "../utils/serverModelUtils";

export interface ConfigFormState {
    cpu: CPU;
    memorySize: number;
    gpuAcceleratorCard: boolean;
    isFormValid: boolean;
    error: string | null;
    serverModels: string[] | null
}

export type ConfigFormAction =
    | { type: "SET_CPU"; payload: CPU }
    | { type: "SET_MEMORY_SIZE"; payload: number }
    | { type: "SET_GPU_ACCELERATOR_CARD"; payload: boolean }
    | { type: "VALIDATE_MEMORY_SIZE"; payload: string }
    | { type: "VALIDATE_FORM" }
    | { type: "UPDATE_SERVER_MODELS" };

export const configFormReducer = (
    state: ConfigFormState,
    action: ConfigFormAction
): ConfigFormState => {
    switch (action.type) {
        case "SET_CPU":
            return { ...state, cpu: action.payload}
        case "SET_MEMORY_SIZE":
            return { ...state, memorySize: action.payload };
        case "SET_GPU_ACCELERATOR_CARD":
            return { ...state, gpuAcceleratorCard: action.payload };
        case "VALIDATE_FORM":
            const { isValid, error } = isValidateMemorySize(state.memorySize);
            if (isValid) {
                return { ...state, isFormValid: true, error: null }
            }
            return { ...state, isFormValid: false, error: error! };
        case "UPDATE_SERVER_MODELS":
            const serverModels = getServerModels(state.cpu, state.memorySize, state.gpuAcceleratorCard);
            return { ...state, serverModels: serverModels}
        default:
            return state;
    }
};
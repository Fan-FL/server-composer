import { CPU } from "../types";
import { CPUS, SERVER_MODELS } from "../constants";

export const getServerModels = (
    cpu: CPU,
    memorySize: number,
    gpuAcceleratorCard: boolean
): string[] => {
    if (memorySize < 2048) {
        return ["No Options"];
    }
    // Rule 1: with gpuAcceleratorCard
    if (gpuAcceleratorCard) {
        if (cpu === "ARM" && memorySize >= 524288) {
            return ["High Density Server"];
        }
        return ["No Options"];
    }

    const result = [];
    // Rule 2: Mainframe, Only with Power CPU
    if (cpu === CPUS.POWER) {
        result.push(SERVER_MODELS.MAINFRAME);
    }

    // Rule 3
    if (memorySize >= 131072) {
        result.push(SERVER_MODELS.RACK_SERVER);
        result.push(SERVER_MODELS.TOWER_SERVER);
    } else {
        result.push(SERVER_MODELS.TOWER_SERVER);
    }

    return result.length > 0 ? result : ["No Options"];
};

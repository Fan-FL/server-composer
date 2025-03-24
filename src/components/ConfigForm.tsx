
import { CPU } from "../types";
import { CPUS } from "../constants";
import MemoryInput from "./MemoryInput";
import { useConfig } from "../context/ConfigContext";
import { useEffect } from "react";


export default function ConfigForm() {
    const {state, dispatch} = useConfig();

    useEffect(() => {
        dispatch({ type: "VALIDATE_FORM" });
    }, [
        state.cpu,
        state.memorySize,
        state.gpuAcceleratorCard,
        dispatch
    ]);

    const updateMemorySize = (memSize: number) => {
        dispatch({ type: "SET_MEMORY_SIZE", payload: memSize });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_SERVER_MODELS" });
    };

    return (
        <form
            name="configFrom"
            className="p-4 text-gray-700"
            onSubmit={handleSubmit}
        >
            <div className="sm:grid grid-cols-3 gap-4 md:gap-x-4 lg:gap-x-16 items-start">
                <label>CPU</label>
                <div className="row-start-2 col-start-1 border border-gray-300 rounded-md shadow-sm">
                    <select
                        className="w-full bg-transparent border-transparent border-r-8 px-2 py-2 cursor-pointer focus:outline-none"
                        value={state.cpu}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_CPU",
                                payload: e.target.value as CPU,
                            })
                        }
                    >
                        {Object.entries(CPUS).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <label className="block max-sm:pt-4">Memory size</label>
                <div className="row-span-2 row-start-2 col-start-2">
                    <MemoryInput
                        updateMemorySize={updateMemorySize}
                        memorySize={state.memorySize}
                        error={state.error}
                    />
                </div>

                <div className="row-start-2 col-start-3 self-center flex items-center gap-2 min-w-52  max-sm:pt-4">
                    <input
                        type="checkbox"
                        className="h-5 w-5 border-gray-300"
                        checked={state.gpuAcceleratorCard}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_GPU_ACCELERATOR_CARD",
                                payload: e.target.checked,
                            })
                        }
                    />
                    <label>GPU Accelerator Card</label>
                </div>
            </div>

            <button
                type="submit"
                disabled={!state.isFormValid}
                className={`w-full mt-6 py-2 px-4 ${
                    state.isFormValid ? "bg-indigo-600" : "bg-gray-400"
                } text-white font-semibold rounded-md shadow-md ${
                    state.isFormValid
                        ? "hover:bg-indigo-700"
                        : "cursor-not-allowed"
                }`}
            >
                Submit
            </button>
        </form>
    );
}
import { useMemo } from "react";
import { useConfig } from "../context/ConfigContext";

export default function ServerModels() {
    const {state} = useConfig();
    const content = useMemo(() => {
        if (!state.serverModels) return null;
        return (
            <div className="p-4 mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Server Model Options:
                </h3>
                {state.serverModels.length === 0 ? (
                    <p className="text-gray-500">
                        No server models calculated yet.
                    </p>
                ) : state.serverModels[0] === "No Options" ? (
                    <p className="text-gray-500">No Options</p>
                ) : (
                    <ul className="list-disc list-inside text-gray-700">
                        {state.serverModels.map((model) => (
                            <li key={model}>{model}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }, [state.serverModels])
    return <>{content}</>;
}
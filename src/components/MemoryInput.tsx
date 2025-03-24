import { useState, useEffect } from "react";

interface MemoryInputProps {
    updateMemorySize: (memSize: number) => void;
    memorySize: number
    error: string | null;
}

export default function MemoryInput({ updateMemorySize, memorySize, error }: MemoryInputProps) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(memorySize.toLocaleString());
    }, [memorySize]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const strVal = e.target.value;
        let num = parseInt(strVal.replaceAll(",", ""));
        if (!Number.isNaN(num)) {
            setInputValue(num.toLocaleString());
            updateMemorySize(num);
        } else {
            setInputValue("");
            updateMemorySize(0);
        }
    };

    return (
        <div className="relative">
            <input
                className="w-full border p-2 border-gray-300 rounded-md focus:outline-none"
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
            <label className="absolute right-3 top-2">MB</label>
            {error && (
                <p className="text-sm text-red-500 mt-1 row-start-3 col-start-2">
                    {error}
                </p>
            )}
        </div>
    );
}

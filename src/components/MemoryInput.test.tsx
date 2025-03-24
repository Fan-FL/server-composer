import { render, screen, fireEvent } from "@testing-library/react";
import MemoryInput from "./MemoryInput";

describe("MemoryInput", () => {
    const mockUpdateMemorySize = jest.fn();

    beforeEach(() => {
        mockUpdateMemorySize.mockClear();
    });
    
    it("should render the input with the provided memory size", () => {
        render(
            <MemoryInput
                updateMemorySize={mockUpdateMemorySize}
                memorySize={1024}
                error={null}
            />
        );
        const input = screen.getByRole("textbox") as HTMLInputElement;
        expect(input.value).toBe("1,024");
    });

    it("should update memory size on valid input", () => {
        render(
            <MemoryInput
                updateMemorySize={mockUpdateMemorySize}
                memorySize={0}
                error={null}
            />
        );
        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "2048" } });
        expect(mockUpdateMemorySize).toHaveBeenCalledWith(2048);
        expect(input.value).toBe("2,048");
    });

    it("should ignore non-numeric input", () => {
        render(
            <MemoryInput
                updateMemorySize={mockUpdateMemorySize}
                memorySize={0}
                error={null}
            />
        );
        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "2048ab" } });
        expect(mockUpdateMemorySize).toHaveBeenCalledWith(2048);
        expect(input.value).toBe("2,048");
    });

    it("should display an error message when error prop is provided", () => {
        render(
            <MemoryInput
                updateMemorySize={mockUpdateMemorySize}
                memorySize={0}
                error="Invalid memory size"
            />
        );
        expect(screen.getByText("Invalid memory size")).toBeInTheDocument();
    });
});

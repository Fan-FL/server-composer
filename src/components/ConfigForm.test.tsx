import { render, screen, fireEvent } from "@testing-library/react";
import ConfigForm from "./ConfigForm";
import { useConfig } from "../context/ConfigContext";
import { CPUS } from "../constants";

jest.mock("../context/ConfigContext", () => ({
    useConfig: jest.fn(),
}));

describe("ConfigForm", () => {
    const mockDispatch = jest.fn();

    const setup = (stateOverrides = {}) => {
        const defaultState = {
            cpu: CPUS.X86,
            memorySize: 2048,
            gpuAcceleratorCard: false,
            isFormValid: true,
            error: null,
            serverModels: null,
        };

        (useConfig as jest.Mock).mockReturnValue({
            state: { ...defaultState, ...stateOverrides },
            dispatch: mockDispatch,
        });

        render(<ConfigForm />);
    };

    beforeEach(() => {
        mockDispatch.mockClear();
    });

    it("should render all form elements correctly", () => {
        setup();
        expect(screen.getByText("CPU")).toBeInTheDocument();
        expect(screen.getByText("Memory size")).toBeInTheDocument();
        expect(screen.getByText("GPU Accelerator Card")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /submit/i })
        ).toBeInTheDocument();
        const submitButton = screen.getByRole("button", { name: /submit/i });
        expect(submitButton).toBeEnabled();
    });

    it("should update CPU selection when changing the dropdown value", () => {
        setup();
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: CPUS.ARM } });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_CPU",
            payload: CPUS.ARM,
        });
    });

    it("should update memory size through MemoryInput", () => {
        setup();
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "4096" } });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_MEMORY_SIZE",
            payload: 4096,
        });
    });

    it("shoudl update GPU Accelerator Card when toggling checkbox", () => {
        setup();
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_GPU_ACCELERATOR_CARD",
            payload: true,
        });
    });

    it("should disable submit button when form is invalid", () => {
        setup({ isFormValid: false });
        const submitButton = screen.getByRole("button", { name: /submit/i });
        expect(submitButton).toBeDisabled();
    });

    it("should UPDATE_SERVER_MODELS on form submission", () => {
        setup();
        const form = screen.getByRole("form");
        fireEvent.submit(form);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "UPDATE_SERVER_MODELS",
        });
    });
});


import { render, screen } from "@testing-library/react";
import ServerModels from "./ServerModels";
import { useConfig } from "../context/ConfigContext";

jest.mock("../context/ConfigContext");

describe("ServerModels", () => {
    it("should display server models", () => {
        (useConfig as jest.Mock).mockReturnValue({
            state: { serverModels: ["Tower Server", "Rack Server"] },
        });

        render(<ServerModels />);
        expect(screen.getByText("Tower Server")).toBeInTheDocument();
        expect(screen.getByText("Rack Server")).toBeInTheDocument();
    });

    it("should display 'No Options' when no server models are available", () => {
        (useConfig as jest.Mock).mockReturnValue({
            state: { serverModels: ["No Options"] },
        });

        render(<ServerModels />);
        expect(screen.getByText("No Options")).toBeInTheDocument();
    });

    it("should display 'No server models calculated yet.' when serverModels is null", () => {
        (useConfig as jest.Mock).mockReturnValue({
            state: { serverModels: null },
        });

        const {container} = render(<ServerModels />);
        expect(container).toBeEmptyDOMElement();
    });
});

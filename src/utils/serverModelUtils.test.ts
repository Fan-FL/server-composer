import { getServerModels } from "./serverModelUtils";
import { CPUS } from "../constants";

describe("getServerModels", () => {
    it("should return High Density Server for ARM CPU with GPU and memory >= 524,288MB", () => {
        expect(getServerModels(CPUS.ARM, 524288, true)).toEqual([
            "High Density Server",
        ]);
        expect(getServerModels(CPUS.ARM, 8388608, true)).toEqual([
            "High Density Server",
        ]);
    });

    it("should return No Options when GPU is enabled but CPU is not ARM", () => {
        expect(getServerModels(CPUS.POWER, 524288, true)).toEqual([
            "No Options"
        ]);
        expect(getServerModels(CPUS.X86, 524288, true)).toEqual([
            "No Options"
        ]);
    });

    it("should return No Options when GPU is enabled but memory < 524,288MB", () => {
        expect(getServerModels(CPUS.ARM, 524287, true)).toEqual(["No Options"]);
    });

    it("should return Mainframe for Power CPU", () => {
        expect(getServerModels(CPUS.POWER, 2048, false)).toContain("Mainframe");
        expect(getServerModels(CPUS.POWER, 4096, false)).toContain("Mainframe");
    });

    it("should return Mainframe and Tower for Power CPU and memory < 131,072MB", () => {
        expect(getServerModels(CPUS.POWER, 131071, false)).toEqual([
            "Mainframe",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.POWER, 2048, false)).toEqual([
            "Mainframe",
            "Tower Server",
        ]);
    });

    it("should return Mainframe, 4U Rack Server, and Tower Server for Power CPU and memory >= 131,072MB", () => {
        expect(getServerModels(CPUS.POWER, 131072, false)).toEqual([
            "Mainframe",
            "4U Rack Server",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.POWER, 131073, false)).toEqual([
            "Mainframe",
            "4U Rack Server",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.POWER, 8388608, false)).toEqual([
            "Mainframe",
            "4U Rack Server",
            "Tower Server",
        ]);
    });

    it("should return 4U Rack Server and Tower Server when memory >= 131,072MB and CPU is not POWER", () => {
        expect(getServerModels(CPUS.X86, 131072, false)).toEqual([
            "4U Rack Server",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.ARM, 131072, false)).toEqual([
            "4U Rack Server",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.X86, 8388608, false)).toEqual([
            "4U Rack Server",
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.ARM, 8388608, false)).toEqual([
            "4U Rack Server",
            "Tower Server",
        ]);
    });

    it("should return only Tower Server when memory < 131,072MB and CPU is not POWER", () => {
        expect(getServerModels(CPUS.X86, 131071, false)).toEqual([
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.X86, 2048, false)).toEqual([
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.ARM, 131071, false)).toEqual([
            "Tower Server",
        ]);
        expect(getServerModels(CPUS.ARM, 2048, false)).toEqual([
            "Tower Server",
        ]);
    });

    it("should return No Options if memory is less than 2,048MB", () => {
        expect(getServerModels(CPUS.ARM, 1024, false)).toEqual(["No Options"]);
        expect(getServerModels(CPUS.ARM, 1024, true)).toEqual(["No Options"]);
        expect(getServerModels(CPUS.POWER, 1024, false)).toEqual(["No Options"]);
        expect(getServerModels(CPUS.POWER, 1024, true)).toEqual(["No Options"]);
        expect(getServerModels(CPUS.X86, 1024, false)).toEqual(["No Options"]);
        expect(getServerModels(CPUS.X86, 1024, true)).toEqual(["No Options"]);
    });
});

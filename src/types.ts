import { CPUS, SERVER_MODELS } from "./constants";
export type CPU = typeof CPUS[keyof typeof CPUS];
export type ServerModel = typeof SERVER_MODELS[keyof typeof SERVER_MODELS];  
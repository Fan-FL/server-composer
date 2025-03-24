import { createContext, useContext, useReducer } from "react";
import { CPUS } from "../constants";
import { configFormReducer, ConfigFormState } from "../reducers/ConfigFormReducer";

const initState: ConfigFormState = {
    cpu: CPUS.X86,
    memorySize: 4096,
    gpuAcceleratorCard: false,
    error: null,
    isFormValid: true,
    serverModels: null
};

const ConfigContext = createContext<{state: ConfigFormState; dispatch: React.Dispatch<any>}>({state: initState, dispatch: () => null});

export const ConfigProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(configFormReducer, initState);
    return (
        <ConfigContext.Provider value={{ state, dispatch}}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
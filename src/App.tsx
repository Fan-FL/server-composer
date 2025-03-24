import React from "react";
import "./App.css";
import ConfigForm from "./components/ConfigForm";
import { ConfigProvider } from "./context/ConfigContext";
import ServerModels from "./components/ServerModels";

function App() {
    return (
        <ConfigProvider>
            <div className="container p-5 text-lg mx-auto font-medium">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Server Composer
                </h1>
                <ConfigForm />
                <ServerModels />
            </div>
        </ConfigProvider>
    );
}

export default App;

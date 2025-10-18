import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/global.css";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./styles/theme";
import { ThemeStore } from "./stores";
import { useStore } from "zustand";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

function Index(){
    const {isDark} = useStore(ThemeStore);

    return (
        <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
            <App />
        </ThemeProvider>
    );
}

root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
);
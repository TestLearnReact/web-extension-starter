import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { ThemeType, Theme } from "./theme";
interface ThemeContextProps {
    themeType: ThemeType;
    theme: Theme;
    setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}
export declare const ThemeContext: React.Context<ThemeContextProps>;
declare const ThemeProvider: React.FC<{
    theme?: ThemeType;
    children: ReactNode;
}>;
declare const useTheme: () => ThemeContextProps;
export { ThemeProvider as ThemeProviderContext, useTheme as useThemeContext };

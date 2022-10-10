import { ms_sendSharedStateSettings } from "@browser-shell/utils";
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { THEMES } from "./theme";
import { ThemeType, Theme } from "./theme";

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>; //| null;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: "light",
  theme: THEMES["light"],
  setCurrentTheme: () => null,
});

export const ThemeProvider: React.FC<{
  theme?: ThemeType;
  children: ReactNode;
}> = ({ theme = "light", children }) => {
  let themeStorage = localStorage.getItem("theme");
  if (!themeStorage) {
    localStorage.setItem("theme", theme);
  }

  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(
    themeStorage as ThemeType
  ); //"light"

  // todo doppelt click
  useEffect(() => {
    ms_sendSharedStateSettings({ theme: currentTheme });
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);

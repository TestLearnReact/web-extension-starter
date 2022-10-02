import React, { Dispatch, ReactNode, SetStateAction } from "react";
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

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>("light");

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

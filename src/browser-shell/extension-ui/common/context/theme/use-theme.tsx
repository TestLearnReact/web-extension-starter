import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { msSendSharedStateSettings } from '@utils/messages';
import { THEMES, ThemeType, Theme } from './theme';

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>; // | null;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: 'light',
  theme: THEMES['light'],
  setCurrentTheme: () => null,
});

const ThemeProvider: React.FC<{
  theme?: ThemeType;
  children: ReactNode;
}> = ({ theme = 'light', children }) => {
  const themeStorage = localStorage.getItem('theme');
  if (!themeStorage) {
    localStorage.setItem('theme', theme);
  }

  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(
    themeStorage as ThemeType,
  ); // "light"

  // todo doppelt click
  useEffect(() => {
    msSendSharedStateSettings({ theme: currentTheme });
    localStorage.setItem('theme', currentTheme);
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

const useTheme = () => React.useContext(ThemeContext);

export { ThemeProvider as ThemeProviderContext, useTheme as useThemeContext };

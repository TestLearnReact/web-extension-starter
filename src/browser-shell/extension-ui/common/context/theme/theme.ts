export interface Theme {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
}

export type ThemeType = 'dark' | 'light';

enum Color {
  VIOLET = '#9E25FC',
  DARK_VIOLET = '#250341',
  LIGHT_GRAY = '#F4F4F4',
  WHITE = '#FFF',
}

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.VIOLET,
    '--secondary': Color.DARK_VIOLET,
    '--background': Color.LIGHT_GRAY,
  },
  dark: {
    '--primary': Color.VIOLET,
    '--secondary': Color.WHITE,
    '--background': Color.DARK_VIOLET,
  },
};

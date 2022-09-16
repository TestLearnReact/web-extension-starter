// JS reimplementation of Style Closet scales for use in styled-components
const colors = {
  blue: "#2179ee",
  green: "#00cc9a",
  coral: "#ff6759",
  gold: "#f0b95b",
  purple: "#7537ef",
  white: "#ffffff",
  black: "#000000",

  grey10: "#f3f4f8",
  grey20: "#e1e5eb",
  grey30: "#c2c6cc",
  grey40: "#9ea2a8",
  grey50: "#686c73",
  grey60: "#30363d",
};

const secondaryColors = {
  blue10: "#ade7ff",
  blue20: "#61bcff",
  blue30: "#2179ee",
  blue40: "#1f4ab4",
  blue50: "#1d2064",
  green10: "#b5ffcb",
  green20: "#5dffa3",
  green30: "#00cc9a",
  green40: "#219a8a",
  green50: "#183f51",
  purple10: "#dec7ff",
  purple20: "#a673ff",
  purple30: "#7537ef",
  purple40: "#4e23b6",
  purple50: "#2d1b64",
  coral10: "#ffc6b3",
  coral20: "#ff8e75",
  coral30: "#ff6759",
  coral40: "#eb312a",
  coral50: "#7b1e30",
  gold10: "#ffedc2",
  gold20: "#ffda8b",
  gold30: "#f0b95b",
  gold40: "#e5a229",
  gold50: "#6a4a24",
};

const breakpoints = ["31.25em", "43.75em", "46.875em"];
const fontSizes = [
  "1.2rem",
  "1.4rem",
  "1.6rem",
  "1.8rem",
  "2.4rem",
  "2.8rem",
  "3.2rem",
  "4.0rem",
  "4.8rem",
  "6.4rem",
];
const space = [
  "0",
  ".4rem",
  ".8rem",
  "1.2rem",
  "1.6rem",
  "2.0rem",
  "3.2rem",
  "4.8rem",
  "6.4rem",
  "9.6rem",
];

const constants = {
  padding: "0",
  rightOffsetPx: "0",
  topOffsetPx: "0",
  paddingRight: "0",
};

const themeColorsDark = {
  fontColor: colors.grey10,
  backgroundColor: colors.grey10,
  lineColor: colors.grey40,
};

const themeColorsLight = {
  fontColor: colors.black,
  backgroundColor: colors.grey10,
  lineColor: colors.black,
};

const themeColors = {
  fontColor: themeColorsLight.fontColor || themeColorsDark.fontColor,
  backgroundColor:
    themeColorsLight.backgroundColor || themeColorsDark.backgroundColor,
  lineColor: colors.green,
};

interface StyleClosetTheme {
  breakpoints: string[];
  fontSizes: string[];
  space: string[];
  colors: { [key in keyof typeof colors]: string };
  secondaryColors: { [key in keyof typeof secondaryColors]: string };
  constants: { [key in keyof typeof constants]: string };
  themeColors: { [key in keyof typeof themeColors]: string };
}

const theme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  themeColors,
};

const lightTheme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  themeColors: {
    fontColor: themeColorsLight.fontColor,
    backgroundColor: themeColorsLight.backgroundColor,
    lineColor: themeColorsLight.lineColor,
  },
};

const darkTheme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  themeColors: {
    fontColor: themeColorsDark.fontColor,
    backgroundColor: themeColorsDark.backgroundColor,
    lineColor: themeColorsDark.lineColor,
  },
};

export { theme, lightTheme, darkTheme, type StyleClosetTheme };

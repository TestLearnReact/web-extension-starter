// JS reimplementation of Style Closet scales for use in styled-components
const colors = {
  blue: '#2179ee',
  green: '#00cc9a',
  coral: '#ff6759',
  gold: '#f0b95b',
  purple: '#7537ef',
  white: '#ffffff',
  black: '#000000',

  grey10: '#f3f4f8',
  grey20: '#e1e5eb',
  grey30: '#c2c6cc',
  grey40: '#9ea2a8',
  grey50: '#686c73',
  grey60: '#30363d',

  // themeLight: {
  //   textColor: "#03121A",
  //   textDark: "#000",
  //   textLight: "#919394",
  //   contentColor: "#333",
  //   backgroundDark: "#F9F9F9",
  //   backgroundLight: "#FFFFFF",
  //   backgroundLight2: "#FFFFFF",
  //   lineColor: "#E0E0E0",
  //   iconColor: "#030303",
  //   iconColorWhenBg: "#FFFFFF",
  //   iconBackground: "#404040",
  // },

  // themeDark: {
  //   textColor: "#FFFFFF",
  //   textDark: "#fff",
  //   textLight: "#b9baba",
  //   backgroundDark: " #181818",
  //   backgroundLight: "#212121",
  //   backgroundLight2: "#202020",
  //   lineColor: "#303030",
  //   iconColor: "#FFFFFF",
  //   iconColorWhenBg: "#FFFFFF",
  //   iconBackground: "#404040",
  // },
};

const secondaryColors = {
  blue10: '#ade7ff',
  blue20: '#61bcff',
  blue30: '#2179ee',
  blue40: '#1f4ab4',
  blue50: '#1d2064',
  green10: '#b5ffcb',
  green20: '#5dffa3',
  green30: '#00cc9a',
  green40: '#219a8a',
  green50: '#183f51',
  purple10: '#dec7ff',
  purple20: '#a673ff',
  purple30: '#7537ef',
  purple40: '#4e23b6',
  purple50: '#2d1b64',
  coral10: '#ffc6b3',
  coral20: '#ff8e75',
  coral30: '#ff6759',
  coral40: '#eb312a',
  coral50: '#7b1e30',
  gold10: '#ffedc2',
  gold20: '#ffda8b',
  gold30: '#f0b95b',
  gold40: '#e5a229',
  gold50: '#6a4a24',
};

const breakpoints = ['31.25em', '43.75em', '46.875em'];
// const fontSizes = [
//   font-size-base: "1.2rem",
//   "1.4rem",
//   "1.6rem",
//   "1.8rem",
//   "2.4rem",
//   "2.8rem",
//   "3.2rem",
//   "4.0rem",
//   "4.8rem",
//   "6.4rem",
// ];

const fontSizes = [
  '1.2rem',
  '1.4rem',
  '1.6rem',
  '1.8rem',
  '2.4rem',
  '2.8rem',
  '3.2rem',
  '4.0rem',
  '4.8rem',
  '6.4rem',
];

const space = [
  '0',
  '.4rem',
  '.8rem',
  '1.2rem',
  '1.6rem',
  '2.0rem',
  '3.2rem',
  '4.8rem',
  '6.4rem',
  '9.6rem',
];

const constants = {
  padding: '0',
  rightOffsetPx: '0',
  topOffsetPx: '0',
  paddingRight: '0',

  toolbarWidth: '30px',
  toolbarWidtExpanded: '40px',

  sidebarOuterWidth: '350px',
};

const variables = {
  sidebarInnerWidth: `calc(${constants.sidebarOuterWidth} - ${constants.toolbarWidtExpanded})`, // constants.toolbarWidtExpanded
};

const themeColorsDark = {
  // fontColor: colors.grey10,
  // backgroundColor: colors.black,
  // lineColor: colors.grey40,
  textColor: '#FFFFFF',
  textDark: '#fff',
  textLight: '#b9baba',
  backgroundDark: ' #181818',
  backgroundLight: '#212121',
  backgroundLight2: '#202020',
  lineColor: '#303030',
  iconColor: '#FFFFFF',
  iconColorWhenBg: '#FFFFFF',
  iconBackground: '#404040',
  //* *** */
};

const themeColorsLight = {
  // fontColor: colors.black,
  // backgroundColor: colors.grey10,
  // lineColor: colors.black,
  textColor: '#03121A',
  textDark: '#000',
  textLight: '#919394',
  contentColor: '#333',
  backgroundDark: '#F9F9F9',
  backgroundLight: '#FFFFFF',
  backgroundLight2: '#FFFFFF',
  lineColor: '#E0E0E0',
  iconColor: '#030303',
  iconColorWhenBg: '#FFFFFF',
  iconBackground: '#404040',
};

const themeColors = {
  // fontColor: themeColorsLight.fontColor || themeColorsDark.fontColor,
  // backgroundColor:
  //   themeColorsLight.backgroundColor || themeColorsDark.backgroundColor,
  // lineColor: colors.green,
  textColor: themeColorsLight.textColor || themeColorsDark.textColor,
  textDark: themeColorsLight.textDark || themeColorsDark.textDark,
  textLight: themeColorsLight.textLight || themeColorsDark.textLight,
  backgroundDark:
    themeColorsLight.backgroundDark || themeColorsDark.backgroundDark,
  backgroundLight:
    themeColorsLight.backgroundLight || themeColorsDark.backgroundLight,
  backgroundLight2:
    themeColorsLight.backgroundLight2 || themeColorsDark.backgroundLight2,
  lineColor: themeColorsLight.lineColor || themeColorsDark.lineColor,
  iconColor: themeColorsLight.iconColor || themeColorsDark.iconColor,
  iconColorWhenBg:
    themeColorsLight.iconColorWhenBg || themeColorsDark.iconColorWhenBg,
  iconBackground:
    themeColorsLight.iconBackground || themeColorsDark.iconBackground,
};

interface StyleClosetTheme {
  breakpoints: string[];
  fontSizes: string[];
  space: string[];
  colors: { [key in keyof typeof colors]: string };
  secondaryColors: { [key in keyof typeof secondaryColors]: string };
  constants: { [key in keyof typeof constants]: string };
  variables: { [key in keyof typeof variables]: string };
  themeColors: { [key in keyof typeof themeColors]: string };
}

const theme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  variables,
  themeColors,
};

const lightTheme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  variables,
  themeColors: {
    // fontColor: themeColorsLight.fontColor,
    // backgroundColor: themeColorsLight.backgroundColor,
    // lineColor: themeColorsLight.lineColor,

    textColor: themeColorsLight.textColor,
    textDark: themeColorsLight.textDark,
    textLight: themeColorsLight.textLight,
    backgroundDark: themeColorsLight.backgroundDark,
    backgroundLight: themeColorsLight.backgroundLight,
    backgroundLight2: themeColorsLight.backgroundLight2,
    lineColor: themeColorsLight.lineColor,
    iconColor: themeColorsLight.iconColor,
    iconColorWhenBg: themeColorsLight.iconColorWhenBg,
    iconBackground: themeColorsLight.iconBackground,
  },
};

const darkTheme: StyleClosetTheme = {
  breakpoints,
  fontSizes,
  space,
  colors,
  secondaryColors,
  constants,
  variables,
  themeColors: {
    // fontColor: themeColorsDark.fontColor,
    // backgroundColor: themeColorsDark.backgroundColor,
    // lineColor: themeColorsDark.lineColor,

    textColor: themeColorsDark.textColor,
    textDark: themeColorsDark.textDark,
    textLight: themeColorsDark.textLight,
    backgroundDark: themeColorsDark.backgroundDark,
    backgroundLight: themeColorsDark.backgroundLight,
    backgroundLight2: themeColorsDark.backgroundLight2,
    lineColor: themeColorsDark.lineColor,
    iconColor: themeColorsDark.iconColor,
    iconColorWhenBg: themeColorsDark.iconColorWhenBg,
    iconBackground: themeColorsDark.iconBackground,
  },
};

export { theme, lightTheme, darkTheme, type StyleClosetTheme };

declare const colors: {
    blue: string;
    green: string;
    coral: string;
    gold: string;
    purple: string;
    white: string;
    black: string;
    grey10: string;
    grey20: string;
    grey30: string;
    grey40: string;
    grey50: string;
    grey60: string;
};
declare const secondaryColors: {
    blue10: string;
    blue20: string;
    blue30: string;
    blue40: string;
    blue50: string;
    green10: string;
    green20: string;
    green30: string;
    green40: string;
    green50: string;
    purple10: string;
    purple20: string;
    purple30: string;
    purple40: string;
    purple50: string;
    coral10: string;
    coral20: string;
    coral30: string;
    coral40: string;
    coral50: string;
    gold10: string;
    gold20: string;
    gold30: string;
    gold40: string;
    gold50: string;
};
declare const constants: {
    padding: string;
    rightOffsetPx: string;
    topOffsetPx: string;
    paddingRight: string;
    toolbarWidth: string;
    toolbarWidtExpanded: string;
    sidebarOuterWidth: string;
};
declare const variables: {
    sidebarInnerWidth: string;
};
declare const themeColors: {
    textColor: string;
    textDark: string;
    textLight: string;
    backgroundDark: string;
    backgroundLight: string;
    backgroundLight2: string;
    lineColor: string;
    iconColor: string;
    iconColorWhenBg: string;
    iconBackground: string;
};
interface StyleClosetTheme {
    breakpoints: string[];
    fontSizes: string[];
    space: string[];
    colors: {
        [key in keyof typeof colors]: string;
    };
    secondaryColors: {
        [key in keyof typeof secondaryColors]: string;
    };
    constants: {
        [key in keyof typeof constants]: string;
    };
    variables: {
        [key in keyof typeof variables]: string;
    };
    themeColors: {
        [key in keyof typeof themeColors]: string;
    };
}
declare const theme: StyleClosetTheme;
declare const lightTheme: StyleClosetTheme;
declare const darkTheme: StyleClosetTheme;
export { theme, lightTheme, darkTheme, type StyleClosetTheme };

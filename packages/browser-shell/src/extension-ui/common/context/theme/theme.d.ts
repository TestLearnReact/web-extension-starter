export interface Theme {
    "--primary": Color;
    "--secondary": Color;
    "--background": Color;
}
export declare type ThemeType = "dark" | "light";
declare enum Color {
    VIOLET = "#9E25FC",
    DARK_VIOLET = "#250341",
    LIGHT_GRAY = "#F4F4F4",
    WHITE = "#FFF"
}
export declare const THEMES: Record<ThemeType, Theme>;
export {};

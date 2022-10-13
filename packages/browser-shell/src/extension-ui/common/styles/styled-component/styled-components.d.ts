import * as styledComponents from "styled-components";
import { StyleClosetTheme } from "./theme";
declare const styled: styledComponents.ThemedStyledInterface<StyleClosetTheme>, css: styledComponents.ThemedCssFunction<StyleClosetTheme>, createGlobalStyle: <P extends object = {}>(first: TemplateStringsArray | styledComponents.CSSObject | styledComponents.InterpolationFunction<styledComponents.ThemedStyledProps<P, StyleClosetTheme>>, ...interpolations: styledComponents.Interpolation<styledComponents.ThemedStyledProps<P, StyleClosetTheme>>[]) => styledComponents.GlobalStyleComponent<P, StyleClosetTheme>, keyframes: (strings: TemplateStringsArray | styledComponents.CSSKeyframes, ...interpolations: styledComponents.SimpleInterpolation[]) => styledComponents.Keyframes, ThemeProvider: styledComponents.BaseThemeProviderComponent<StyleClosetTheme, StyleClosetTheme>;
export { styled, css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;

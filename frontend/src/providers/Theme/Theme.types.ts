import { CSSProp, DefaultTheme } from "styled-components";
import { ButtonStyles } from "../../components/Button/Button.variants";
import { palettes } from "../../App.constants";

export type IThemePalettes = typeof palettes

export interface IThemeModes {
  light: DefaultTheme;
  dark: DefaultTheme;
}

export interface IThemeFonts {
  Rubik: CSSProp;
}

export interface IThemeTypography {
  headerNormal: CSSProp;
  sectionTitle: CSSProp;
  bodyLarge: CSSProp;
  bodySmall: CSSProp;
  label: CSSProp;
}

export interface IThemeComponents {
  buttons: typeof ButtonStyles;
}

export interface ITheme {
  palettes: IThemePalettes;
  modes: IThemeModes;
  common: DefaultTheme;
  typography: IThemeTypography;
  components: IThemeComponents;
}

export type TModes = "light" | "dark";

export interface IThemeState {
  palettes: IThemePalettes;
  mode: TModes;
  toggleMode: () => void;
}

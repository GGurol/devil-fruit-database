import { css } from "styled-components";

import { palettes } from "../../App.constants";
import {
  ITheme,
  IThemeFonts,
  IThemeModes,
  IThemeTypography,
} from "./Theme.types";
import { ButtonStyles } from "../../components/Button/Button.variants";
import { CheckboxStyles } from "../../components/Checkbox/Checkbox.variants";

const modes: IThemeModes = {
  light: {
    bgRegular: palettes.grayscale[100],
    bgSurface: palettes.grayscale[50],
    fgRegular: palettes.grayscale[800],
    fgRegularInverse: palettes.grayscale[50],
    fgSecondary: `${palettes.grayscale[900]}CC` as const, // #000B12CC
    fgSubdued: `${palettes.grayscale[900]}99` as const, // #000B1299
    borderRegular: palettes.grayscale[400],
    dividerRegular: palettes.grayscale[500], // #A2A2A340
  },
  dark: {
    bgRegular: palettes.grayscale[950],
    bgSurface: palettes.grayscale[800],
    fgRegular: palettes.secondary[50],
    fgRegularInverse: palettes.grayscale[800],
    fgSecondary: `${palettes.secondary[200]}80` as const, // #B9E0FE80
    fgSubdued: `${palettes.secondary[200]}CC` as const, // #B9E0FECC
    borderRegular: `${palettes.secondary[200]}80` as const, //#B9E0FE80
    dividerRegular: `${palettes.secondary[200]}CC` as const, // ##B9E0FECC
  },
};

const fonts: IThemeFonts = {
  Rubik: css`
    font-family: "Rubik", sans-serif;
  `,
};

const typography: IThemeTypography = {
  headerNormal: css`
    /* Headers/headerNormal */
    ${fonts.Rubik}
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.5px;
  `,
  sectionTitle: css`
    /* Headers/sectionTitle */
    ${fonts.Rubik}
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: -0.25px;
  `,
  bodyLarge: css`
    /* Body/bodyLarge */
    ${fonts.Rubik}
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.051px;
  `,
  bodySmall: css`
    /* Body/bodySmall */
    ${fonts.Rubik}
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.02px;
  `,
  label: css`
    /* Supporting/label */
    ${fonts.Rubik}
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.15px;
    text-transform: uppercase;
  `,
};

export const themeVars: ITheme = {
  modes,
  common: {
    bgSubdued: `${palettes.grayscale[700]}1A` as const, // #6F70711A
    bgOverlay: `${palettes.grayscale[700]}40` as const, // #6F707140
    bgOverlaySecondary: `${palettes.grayscale[600]}40` as const, // #A2A2A340
    shadowsSoft: `${palettes.base.black}1A` as const, // ##0000001A
    accentPrimary: palettes.tertiary[500],
    accentSecondary: palettes.secondary[500],
    focusShadow: `${palettes.secondary[700]}33`,
  },
  typography,
  components: { buttons: ButtonStyles, checkboxes: CheckboxStyles },
  palettes: { ...palettes },
};

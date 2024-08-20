import { css } from "styled-components";

import { palettes } from "../../App.constants";
import {
  ITheme,
  IThemeCommonColors,
  IThemeCommonStyles,
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

const commonColors: IThemeCommonColors = {
  bgSubdued: `${palettes.grayscale[700]}1A` as const, // #6F70711A
  bgOverlay: `${palettes.grayscale[700]}40` as const, // #6F707140
  bgOverlaySecondary: `${palettes.grayscale[600]}40` as const, // #A2A2A340
  shadowsSoft: `${palettes.base.black}1A` as const, // ##0000001A
  accentPrimary: palettes.tertiary[500],
  accentSecondary: palettes.secondary[500],
  focusShadow: `${palettes.secondary[700]}33`,
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
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem; /* 114.286% */
    letter-spacing: -0.03125rem;
  `,
  sectionTitle: css`
    /* Headers/sectionTitle */
    ${fonts.Rubik}
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.75rem; /* 116.667% */
    letter-spacing: -0.01563rem;
  `,
  bodyLarge: css`
    /* Body/bodyLarge */
    ${fonts.Rubik}
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.375rem; /* 137.5% */
    letter-spacing: 0.00319rem;
  `,
  bodySmall: css`
    /* Body/bodySmall */
    ${fonts.Rubik}
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 153.846% */
    letter-spacing: 0.00125rem;
  `,
  label: css`
    /* Supporting/label */
    ${fonts.Rubik}
    font-size: 0.6875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; /* 181.818% */
    letter-spacing: 0.00938rem;
    text-transform: uppercase;
  `,
  buttonSmall: css`
    /* Interactive/buttonSmall */
    ${fonts.Rubik}
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 153.846% */
    letter-spacing: 0.00938rem;
  `,
};

const commonStyles: IThemeCommonStyles = {
  commonBorder: css`
    border: 1px solid ${({ theme }) => theme.borderRegular};
  `,
};

export const themeVars: ITheme = {
  palettes: { ...palettes },
  modes,
  commonColors,
  typography,
  components: { buttons: ButtonStyles, checkboxes: CheckboxStyles },
  commonStyles,
};

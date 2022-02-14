import React from 'react'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    smallh3: React.CSSProperties;
    noFoundTitle: React.CSSProperties;
    subtitle3: React.CSSProperties;
    bodyBig: React.CSSProperties;
    dateText: React.CSSProperties;
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    emphasisBody1: React.CSSProperties;
    emphasisBody2: React.CSSProperties;
    bodyWeak: React.CSSProperties;
    bodyWeak2: React.CSSProperties;
    small: React.CSSProperties;
    small2: React.CSSProperties;
    errorText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    smallh3?: React.CSSProperties;
    noFoundTitle?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
    bodyBig?: React.CSSProperties;
    dateText?: React.CSSProperties;
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    emphasisBody1?: React.CSSProperties;
    emphasisBody2?: React.CSSProperties;
    bodyWeak?: React.CSSProperties;
    bodyWeak2?: React.CSSProperties;
    small?: React.CSSProperties;
    small2?: React.CSSProperties;
    errorText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    smallh3: true;
    noFoundTitle: true;
    subtitle3: true;
    bodyBig: true;
    dateText: true;
    body3: true;
    body4: true;
    emphasisBody1: true;
    emphasisBody2: true;
    bodyWeak: true;
    bodyWeak2: true;
    small: true;
    small2: true;
    errorText: true;
  }
}
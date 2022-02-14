import { createTheme } from '@mui/material'

import { ruRU } from '@mui/material/locale'

const projectFonts = ['"Rubik"', '"sans-serif"']

// Конфигурация темы
const theme = createTheme({
  spacing: 2,
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 769,
      lg: 1024,
      xl: 1441,
    },
  },
  typography: {
    fontFamily: projectFonts.join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    bodyBig: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '16px',
      letterSpacing: '0.025rem',
    },
    smallh3: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: '0.025rem',
    },
    h3: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: '0.025rem',
    },
    button: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '0.025rem',
    },
    dateText: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.375rem',
      fontWeight: 500,
      lineHeight: '26px',
      letterSpacing: '0.025rem',
    },
    noFoundTitle: {
      fontFamily: projectFonts.join(','),
      fontSize: '2.375rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#F56565',
    },
    subtitle3: {
      fontFamily: projectFonts.join(','),
      fontSize: '2.375rem',
      fontWeight: 500,
      lineHeight: '30px', // ???
      color: '#2D3748',
    },
    subtitle2: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.55,
      color: 'grey.300',
    },
    subtitle1: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 2,
      color: '#5B6473',
    },
    errorText: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1,
      color: '#F56565',
    },
    emphasisBody1: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#5B6473',
    },
    emphasisBody2: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#5B6473',
    },
    body2: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.55,
      color: 'grey.300',
    },
    body3: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1,
    },
    body4: {
      fontFamily: projectFonts.join(','),
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: '31px', // ??....
      color: '#5B6473',
    },
    bodyWeak: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1,
      color: '#5B6473',
    },
    bodyWeak2: {
      fontFamily: projectFonts.join(','),
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0.025rem',
      color: '#5B6473',
    },
    small: {
      fontFamily: projectFonts.join(','),
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.15,
      color: '#5B6473',
    },
    small2: {
      fontFamily: projectFonts.join(','),
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.15,
      color: '#2D3748',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: '14px',
        }
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0',
        }
      }
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0',
          color: "grey.100",
          background: 'transparent',
          '& ~ &': {
            background: 'transparent',
          },
          '&:hover': {
            background: 'transparent',
          },
        }
      }
    }
  },
  palette: {
    action: {
      disabledBackground: '#CBD5E0',
      disabled: '#FFFFFF'
    },
    info: {
      main: '#63B3ED',
    },
    primary: {
      main: '#1874FD',
      dark: '#085FE2'
    },
    grey: {
      100: '#718096', // inactive
      200: '#5B6473', // info
      300: '#2D3748' // headline
    },
    success: {
      main: '#2AD966',
    },
    warning: {
      main: '#FBD38D',
    },
    error: {
      main: '#F56565'
    },
  },
}, ruRU);


// Breakpoints
theme.typography.smallh3 = {
  ...theme.typography.smallh3,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    lineHeight: '20px',
  },
}

theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: 2,
  },
}

theme.typography.errorText = {
  ...theme.typography.errorText,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
  },
}

theme.typography.emphasisBody1 = {
  ...theme.typography.emphasisBody1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
  },
}

theme.typography.emphasisBody2 = {
  ...theme.typography.emphasisBody2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: '22px',
  },
}

theme.typography.bodyWeak = {
  ...theme.typography.bodyWeak,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    lineHeight: 1.57,
  },
}

theme.typography.bodyWeak2 = {
  ...theme.typography.bodyWeak2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    lineHeight: 1.57,
  },
}

theme.typography.button = {
  ...theme.typography.button,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    lineHeight: '14px',
  },
}

theme.typography.h3 = {
  ...theme.typography.h3,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    lineHeight: 1.375,
  },
}

theme.typography.body4 = {
  ...theme.typography.body4,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    lineHeight: 1.3,
  },
}

theme.typography.noFoundTitle = {
  ...theme.typography.noFoundTitle,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3125rem',
    lineHeight: '32px',
  },
}

theme.typography.bodyBig = {
  ...theme.typography.bodyBig,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: '22px',
  },
}

theme.typography.subtitle3 = {
  ...theme.typography.subtitle3,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
    lineHeight: '30px',
  },
}

export default theme
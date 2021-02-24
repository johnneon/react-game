import React from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {    
    root?: string  // optional
  }
}

const dark = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    type: 'dark',
    primary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#efebe9',
      light: '#ffffff',
      dark: '#bdb9b7',
      contrastText: '#fff'
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#000000',
    },
    success: {
      main: '#76ff03',
      light: '#b0ff57',
      dark: '#32cb00',
      contrastText: '#000000',
    },
    background: {
      paper: '#424242',
      default: '#303030'
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    }
  },
  typography: {
    htmlFontSize: 16,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.13rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
    },
  },
});

const light = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    type: 'dark',
    primary: {
      main: '#efebe9',
      light: '#ffffff',
      dark: '#bdb9b7',
      contrastText: '#000000'
    },
    secondary: {
      main: '#efebe9',
      light: '#ffffff',
      dark: '#bdb9b7',
      contrastText: '#fff'
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#000000',
    },
    success: {
      main: '#76ff03',
      light: '#b0ff57',
      dark: '#32cb00',
      contrastText: '#000000',
    },
    background: {
      paper: '#424242',
      default: '#303030'
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    }
  },
  typography: {
    htmlFontSize: 16,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.13rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
    },
  },
});

interface IThemeProps {
  isLightTheme: boolean;
}

export const CustomThemeProvider: React.FunctionComponent<IThemeProps> = (props) => {
  const { children, isLightTheme } = props;

  return (
    <ThemeProvider theme={!isLightTheme ? dark : light}>
      {children}
    </ThemeProvider>
  );
}
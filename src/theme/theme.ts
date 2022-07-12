import { extendTheme, withDefaultProps } from '@chakra-ui/react';
import { colors } from './colors';

export const fonts = {
  main: 'Helvetica Neue,Helvetica,Arial,sans-serif', // menu, titles, etc.
  mono: '"europa",sans-serif',
  article: 'Nunito Sans, Nunito, Avenir Next, Lato, Georgia, Cambria, "Times New Roman", Times, serif', // article (serif, to read)
};

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: '#000',
    white: '#fff',
    mainLighter: '#4FD1C5', // teal 300
    main: '#38B2AC', // teal 400
    mainDarker: '#319795', // teal 500
    brand: {
      // (chakra default teal centered (500) on main (teal.400))
      100: '#E6FFFA',
      200: '#B2F5EA',
      300: '#81E6D9',
      400: '#4FD1C5',
      500: '#38B2AC',
      600: '#319795',
      700: '#2C7A7B',
      800: '#285E61',
      900: '#234E52',
      950: '#1D4044',
    },
    backgroundColor: {
      0: 'rgba(255, 255, 255)',
      1: 'rgba(253, 253, 253)',
    },
    whiteAlpha: {
      50: 'rgba(255, 255, 255, 0.04)',
      100: 'rgba(255, 255, 255, 0.06)',
      200: 'rgba(255, 255, 255, 0.08)',
      300: 'rgba(255, 255, 255, 0.16)',
      400: 'rgba(255, 255, 255, 0.24)',
      500: 'rgba(255, 255, 255, 0.36)',
      600: 'rgba(255, 255, 255, 0.48)',
      700: 'rgba(255, 255, 255, 0.64)',
      800: 'rgba(255, 255, 255, 0.80)',
      900: 'rgba(255, 255, 255, 0.92)',
    },
    blackAlpha: {
      50: 'rgba(0, 0, 0, 0.04)',
      100: 'rgba(0, 0, 0, 0.06)',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.16)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.36)',
      600: 'rgba(0, 0, 0, 0.48)',
      700: 'rgba(0, 0, 0, 0.64)',
      750: 'rgba(0, 0, 0, 0.70)',
      800: 'rgba(0, 0, 0, 0.80)',
      900: 'rgba(0, 0, 0, 0.92)',
    },

    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    grayFont: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: 'rgba(0, 0, 0, 0.84)',
      800: '#1A202C',
      900: '#171923',
    },
    grayDivider: {
      50: 'rgb(255, 255, 255)',
      100: 'rgb(247, 247, 247)',
      200: 'rgb(239, 239, 239)',
      300: 'rgb(229, 229, 229)',
      400: 'rgb(215, 215, 215)',
      500: 'rgb(190, 190, 190)',
      600: 'rgb(150, 150, 150)',
      700: 'rgb(100, 100, 100)',
      800: 'rgb(50, 50, 50)',
      900: 'rgb(0, 0, 0)',
    },
    ...colors,
  },
  fonts: {
    heading: fonts.main,
    body: fonts.main,
    mono: fonts.mono,
  },
  // fontSizes: {
  //   xs: '12px',
  //   sm: '14px',
  //   md: '16px',
  //   lg: '18px',
  //   xl: '20px',
  //   '2xl': '24px',
  //   '3xl': '28px',
  //   '4xl': '36px',
  //   '5xl': '48px',
  //   '6xl': '64px',
  // },
  fontSizes: {
    xs: '0.7rem',
    sm: '0.825rem',
    md: '0.95rem',
    lg: '1.075rem',
    xl: '1.20rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  components: {
    Popover: {
      parts: ['popper'],
      sizes: {
        starRater: {
          // checkout https://github.com/chakra-ui/chakra-ui/issues/2481 (what is described in first comments doesn't seem to work)
          popper: {
            w: '146px',
          },
        },
      },
    },
    Skeleton: {
      defaultProps: {
        startColor: 'gray.300',
        endColor: 'gray.400',
      },
    },
    Button: {
      sizes: {
        xl: {
          h: '60px',
          fontSize: 'xl',
          px: '32px',
        },
      },
    },
    Input: {
      sizes: {
        xl: {
          field: {
            fontSize: 'xl',
            px: 5,
            h: '60px',
            borderRadius: 'lg',
          },
          addon: {
            fontSize: 'xl',
            px: 6,
            h: '60px',
            borderRadius: 'lg',
          },
        },
      },
    },
  },
});

export const globalStyleVariables = {
  leftPadding: theme.sizes['3'], // left of logo/name on header, left on menu items, etc. Align according to this
  rightPadding: theme.sizes['4'],
};

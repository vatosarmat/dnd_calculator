import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  spacing(n: number = 1) {
    return this.layout.spacing * n
  },
  font: {
    p: { size: 14, weight: 500 },
    button: { size: 18, weight: 500 },
    display: { size: 20, weight: 800 },
  },
  layout: {
    block: {
      width: 240,
      height: {
        operations: 56,
        digits: 224,
        controls: 56,
        display: 60,
      },
    },
    //for various paddings and gaps
    spacing: 8,
  },
  decoration: {
    buttonBorderRadius: 6,
  },
  palette: {
    primary: '#5d5fef',
    primaryHover: '#eff0ff',
    primaryHover2: '#7f81ff',
    secondary: '#ef5d9c',
    secondaryHover2: '#ff7fb7',
    sky: '#f0f9ff',
    gray: {
      black: '#303030',
      white: '#ffffff',

      displayBg: '#f3f4f6',
      displayFg: '#111827',

      buttonBorder: '#e2e3e5',
      canvasBorder: '#c4c4c4',
    },
  },
}

export default theme

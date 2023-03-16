import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  spacing(n: number = 1) {
    return this.layout.spacing * n
  },
  layout: {
    block: {
      width: 240,
      height: {
        operations: 56,
        digits: 224,
        equal: 72,
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
    sky: '#f0f9ff',
    gray: {
      black: '#000000',
      white: '#ffffff',

      displayBg: '#f3f4f6',
      displayFg: '#111827',

      buttonBorder: '#e2e3e5',
      canvasBorder: '#c4c4c4',
    },
  },
}

export default theme

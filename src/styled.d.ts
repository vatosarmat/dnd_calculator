// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing(n?: number): number
    font: {
      p: { size: number; weight: number }
      button: { size: number; weight: number }
      display: { size: number; weight: number }
    }
    layout: {
      block: {
        width: number
        height: {
          operations: number
          digits: number
          controls: number
          display: number
        }
      }
      spacing: number
    }
    decoration: {
      buttonBorderRadius: number
    }
    palette: {
      primary: string
      primaryHover: string
      primaryHover2: sting
      secondary: string
      secondaryHover2: sting
      sky: string
      gray: {
        black: string
        white: string

        displayBg: string
        displayFg: string

        buttonBorder: string
        canvasBorder: string
      }
    }
  }
}

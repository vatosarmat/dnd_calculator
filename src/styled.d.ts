// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing(n?: number): number
    layout: {
      block: {
        width: number
        height: {
          operations: number
          digits: number
          equal: number
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

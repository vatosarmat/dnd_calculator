// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing(n?: number): number
    layout: {
      block: {
        width: string
        height: {
          operations: string
          digits: string
          equal: string
        }
      }
      spacing: number
    }
    decoration: {
      buttonBorderRadius: string
    }
    palette: {
      primary: string
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

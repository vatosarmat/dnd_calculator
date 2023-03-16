import { useContext } from 'react'
import styled from 'styled-components'

import { CalculatorBlock, DraggableCalculatorBlock } from 'components/calculator-block'
import { StateContext, calculatorBlockNameValues } from 'state'

export type PaletteProps = {}

const StyledBlock = styled.div<PaletteProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)}px;
`

const Palette: React.FC<PaletteProps> = () => {
  const { blockLocation } = useContext(StateContext)

  return (
    <StyledBlock>
      {calculatorBlockNameValues.map(blockName => {
        const props = { key: blockName, disabled: true, content: blockName }
        return blockLocation[blockName] === 'palette' ? (
          <DraggableCalculatorBlock {...props} shadow />
        ) : (
          <CalculatorBlock {...props} transparency={'high'} />
        )
      })}
    </StyledBlock>
  )
}

export default Palette

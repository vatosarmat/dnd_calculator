import styled from 'styled-components'

import CalculatorBlock from 'components/calculator-block'

export type PaletteProps = {}

const StyledBlock = styled.div<PaletteProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)}px;
`

const Palette: React.FC<PaletteProps> = () => {
  return (
    <StyledBlock>
      <CalculatorBlock draggable shadow disabled content={'operations'} />
      <CalculatorBlock draggable shadow disabled content={'digits'} />
      <CalculatorBlock draggable shadow disabled content={'equal'} />
    </StyledBlock>
  )
}

export default Palette

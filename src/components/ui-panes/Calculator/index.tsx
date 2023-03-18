import { FC, useContext } from 'react'
import Shape from './Shape'
import { CalculatorBlock } from 'components/calculator-block'
import { StateContext } from 'state'

const Calculator: FC = () => {
  const { canvasContent } = useContext(StateContext)

  return (
    <Shape>
      {canvasContent.map(block => {
        return <CalculatorBlock key={block} content={block} />
      })}
    </Shape>
  )
}

export default Calculator

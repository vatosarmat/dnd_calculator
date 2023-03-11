import { FC } from 'react'
import styled from 'styled-components'

import Button from 'components/controls/Button'

export type ButtonBlockProps = {
  disabled?: boolean
}

const Line = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing()}px;
  height: 100%;
`

export const Operations: FC<ButtonBlockProps> = ({ disabled }) => {
  const ops = ['/', 'x', '-', '+']

  return (
    <Line>
      {ops.map(op => (
        <Button disabled={disabled} key={op}>
          {op}
        </Button>
      ))}
    </Line>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  & > *:nth-child(10) {
    grid-column: span 2;
  }
  gap: ${({ theme }) => theme.spacing()}px;
  height: 100%;
`

const d3 = (a: number) => [a, a + 1, a + 2].map(d => d.toString())

export const Digits: FC<ButtonBlockProps> = ({ disabled }) => {
  const digits = [...d3(7), ...d3(4), ...d3(1), '0', ',']

  return (
    <Grid>
      {digits.map(d => (
        <Button disabled={disabled} key={d}>
          {d}
        </Button>
      ))}
    </Grid>
  )
}

const exp = { Operations, Digits }

export default exp

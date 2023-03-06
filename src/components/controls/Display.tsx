export type DisplayProps = {
  content: string
}

const Display: React.FC<DisplayProps> = ({ content }) => {
  return <div>{content}</div>
}

export default Display

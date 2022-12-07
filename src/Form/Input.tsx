type Props = {
  value?: string
  onChange?: (value: string) => void
}

/* Input 组件, 负责回传value值 */
function Input({ onChange, value }: Props) {
  return <input className='input' onChange={e => onChange && onChange(e.target.value)} value={value} />
}
/* 给Component 增加标签 */
Input.displayName = 'Input'

export default Input

import React, { useCallback } from 'react'

type Props = {
  name: string
  label: string
  value?: string
  handleChange?: (name: string, value: any) => void
}

function FormItem(props: React.PropsWithChildren<Props>) {
  const { name, label, value = '', handleChange, children } = props

  const onChange = (value: string) => {
    handleChange?.(name, value)
  }
  return (
    <div className='form-item'>
      <span className='label'>{label}</span>
      {React.isValidElement(children) && (children.type as any)?.displayName === 'Input'
        ? React.cloneElement(children, { onChange, value })
        : null}
    </div>
  )
}

FormItem.displayName = 'FormItem'

export default FormItem

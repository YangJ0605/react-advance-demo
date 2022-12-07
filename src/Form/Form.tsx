import React, { Component, JSXElementConstructor, ReactElement } from 'react'

type State = {
  formData: Record<string, any>
}

type Props = {}

export default class Form extends Component<React.PropsWithChildren, State> {
  static displayName = 'Form'
  state = {
    formData: {} as Record<string, any>
  }

  submitForm = (cb: (value: Record<string, any>) => void) => {
    cb({ ...this.state.formData })
  }

  resetForm = () => {
    const { formData } = this.state

    Object.keys(formData).flatMap(key => {
      formData[key] = ''
    })

    this.setState({
      formData
    })
  }

  setValue = (name: string, value: any) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    })
  }

  render() {
    const { children } = this.props
    const renderChildren: React.ReactNode[] = []

    React.Children.forEach(children, (child: any) => {
      if (child?.type?.displayName === 'FormItem') {
        console.log('child.props', child.props)
        const { name } = child.props
        const newChild = React.cloneElement(
          child,
          {
            key: name,
            handleChange: this.setValue,
            value: this.state.formData[name] || ''
          },
          child.props.children
        )

        renderChildren.push(newChild)
      }
    })

    return renderChildren
  }
}

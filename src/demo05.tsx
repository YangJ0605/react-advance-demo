import React, { ForwardedRef, forwardRef, MutableRefObject, useImperativeHandle, useRef, useState } from 'react'

function Son(props, ref: ForwardedRef<any>) {
  const inputRef: MutableRefObject<any> = useRef(null)
  const [inputValue, setInputValue] = useState('')

  useImperativeHandle(
    ref,
    () => {
      return {
        onFocus() {
          inputRef.current.focus()
        },
        onChangeValue(value: string) {
          /* 声明方法用于改变input的值 */
          setInputValue(value)
        }
      }
    },
    []
  )
  return (
    <div>
      <input placeholder='请输入内容' ref={inputRef} value={inputValue} />
    </div>
  )
}

const ForwardSon = forwardRef(Son)

// class Index extends React.Component {
//   cur = null
//   handerClick() {
//     const { onFocus, onChangeValue } = this.cur
//     onFocus() // 让子组件的输入框获取焦点
//     onChangeValue('let us learn React!') // 让子组件input
//   }
//   render() {
//     return (
//       <div style={{ marginTop: '50px' }}>
//         <ForwardSon ref={cur => (this.cur = cur)} />
//         <button onClick={this.handerClick.bind(this)}>操控子组件</button>
//       </div>
//     )
//   }
// }

class Index extends React.Component {
  state = { num: 0 }
  node = null
  render() {
    return (
      <div>
        <div
          ref={node => {
            this.node = node
            console.log('此时的参数是什么：', this.node)
          }}
        >
          ref元素节点
        </div>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}>点击</button>
      </div>
    )
  }
}

export default Index

import React, { ReactNode, useState } from 'react'

/* 获取随机颜色 */
function getColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)'
}
/* 获取随机位置 */
function getPosition(position: { width: number; height: number }) {
  const { width, height } = position
  return { left: Math.ceil(Math.random() * width) + 'px', top: Math.ceil(Math.random() * height) + 'px' }
}
/* 色块组件 */
function Circle({ position }: { position: { width: number; height: number } }) {
  const style = React.useMemo(() => {
    //用useMemo缓存，计算出来的随机位置和色值。
    return {
      background: getColor(),
      width: 4,
      height: 4,
      ...getPosition(position)
    }
  }, [])
  return <div style={{ ...style, position: 'absolute' }} className='circle' />
}

// class Index extends React.Component {
//   state = {
//     dataList: [], // 数据源列表
//     renderList: [], // 渲染列表
//     position: { width: 0, height: 0 } // 位置信息
//   }
//   box = React.createRef<HTMLDivElement>()
//   componentDidMount() {
//     const { offsetHeight, offsetWidth } = this.box.current!
//     console.log('offsetHeight', offsetHeight)
//     console.log('offsetWidth', offsetWidth)
//     const originList = new Array(20000).fill(1)
//     this.setState({
//       position: { height: offsetHeight, width: offsetWidth },
//       dataList: originList,
//       renderList: originList
//     })
//   }
//   render() {
//     const { renderList, position } = this.state
//     console.log('renderList', renderList, position)
//     return (
//       <div className='bigData_index' ref={this.box}>
//         {renderList.map((item, index) => (
//           <Circle position={position} key={index} />
//         ))}
//       </div>
//     )
//   }
// }

// TODO: 改造方案
class Index extends React.Component {
  state = {
    dataList: [], //数据源列表
    renderList: [] as ReactNode[], //渲染列表
    position: { width: 0, height: 0 }, // 位置信息
    eachRenderNum: 500 // 每次渲染数量
  }
  box = React.createRef<HTMLDivElement>()
  componentDidMount() {
    const { offsetHeight, offsetWidth } = this.box.current!
    const originList = new Array(20000).fill(1)
    const times = Math.ceil(originList.length / this.state.eachRenderNum) /* 计算需要渲染此次数*/
    let index = 1
    this.setState(
      {
        dataList: originList,
        position: { height: offsetHeight, width: offsetWidth }
      },
      () => {
        this.toRenderList(index, times)
      }
    )
  }
  toRenderList = (index: number, times: number) => {
    if (index > times) return /* 如果渲染完成，那么退出 */
    const { renderList } = this.state
    renderList.push(
      this.renderNewList(index)
    ) /* 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染 */
    this.setState({
      renderList
    })
    requestIdleCallback(() => {
      /* 用 requestIdleCallback 代替 setTimeout 浏览器空闲执行下一批渲染 */
      this.toRenderList(++index, times)
    })
  }
  renderNewList(index: number) {
    /* 得到最新的渲染列表 */
    const { dataList, position, eachRenderNum } = this.state
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum)
    return (
      <React.Fragment key={index}>
        {list.map((item, idx) => (
          <Circle key={idx + (index - 1) * eachRenderNum} position={position} />
        ))}
      </React.Fragment>
    )
  }
  render() {
    return (
      <div className='bigData_index' ref={this.box}>
        {this.state.renderList}
      </div>
    )
  }
}

export default () => {
  const [show, setShow] = useState(false)
  const [btnShow, setBtnShow] = useState(true)
  const handleClick = () => {
    setBtnShow(false)
    setTimeout(() => {
      setShow(true)
    })
  }
  return (
    <div>
      {btnShow && <button onClick={handleClick}>show</button>}
      {show && <Index />}
    </div>
  )
}

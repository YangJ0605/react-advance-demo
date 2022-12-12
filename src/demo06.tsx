import React from 'react'
const ThemeContext = React.createContext(null)
const OtherContext = React.createContext(null)

function ConsumerDemo() {
  const { color, background } = React.useContext(ThemeContext)
  const x = React.useContext(OtherContext)
  console.log('render', x)
  return <div style={{ color, background }}>消费者</div>
}
const Son = React.memo(() => {
  console.log('memo render')
  return <ConsumerDemo />
}) // 子组件

const ThemeProvider = ThemeContext.Provider //提供者
const OtherProvider = OtherContext.Provider

export default function ProviderDemo() {
  const [contextValue, setContextValue] = React.useState({ color: '#ccc', background: 'pink' })
  return (
    <div>
      <ThemeProvider value={contextValue}>
        <OtherContext.Provider value={{ name: 'cc' }}>
          <Son />
        </OtherContext.Provider>
      </ThemeProvider>
      <button onClick={() => setContextValue({ color: '#fff', background: 'blue' })}>切换主题</button>
    </div>
  )
}

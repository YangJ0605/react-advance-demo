import { useState } from 'react'
import Demo01 from './demo01'
import Demo02 from './demo02'
import Demo03 from './demo03'
import Demo04 from './demo04'
import Demo05 from './demo05'
import Demo06 from './demo06'
import Demo07 from './demo07'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Demo03 count={count} />
      {count}
      <button onClick={() => setCount(Math.random())}>click222</button> */}
      {/* <Demo04 /> */}
      {/* <Demo05 /> */}
      <Demo07 />
    </div>
  )
}

export default App

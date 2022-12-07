import React, { useState } from 'react'

export default function demo03(props: { count: number }) {
  const [a, setA] = useState(() => {
    console.log('init')
    if (props.count === 0) {
      return 'cccccc'
    }
    return 'dddd'
  })

  return (
    <div>
      {a}
      <button
        onClick={() => {
          setA(Math.random() + '')
        }}
      >
        click
      </button>
    </div>
  )
}

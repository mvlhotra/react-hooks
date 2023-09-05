// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React, {useRef, useEffect} from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = useRef()
  useEffect(
    () => {
      const tiltNode = tiltRef.current
      VanillaTilt.init(tiltNode, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      })

      return () => tiltNode.vanillaTilt.destroy() // cleanup all the event handlers that vanillaTilt attaches to prevent memory leak
    },
    [], // we don't need to sync the state of the "world" with the state of the "app", so keep this empty.
  )
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App

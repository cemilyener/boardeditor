import { useState } from 'react'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <h1 className=" bg-amber-700 text-3xl font-bold underline">
              Hello world!
          </h1>
          <div className="flex items-stretch ...">
              <div className="py-4">01</div>
              <div className="py-12">02</div>
              <div className="py-8">03</div>
          </div>
          <div className="w-32 h-30 bg-amber-700"> merhaba</div>
      </>
  )
}

export default App

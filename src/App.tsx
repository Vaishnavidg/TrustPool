import { useState } from 'react'
import ExampleComponent from '@/components/ExampleComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to TrustPool</h1>
        <p>A clean, production-ready React + TypeScript setup</p>
      </header>
      <main className="app-main">
        <ExampleComponent />
        <div className="counter-section">
          <button onClick={() => setCount(count => count + 1)}>
            Count is {count}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App

import './quiz.css'
import { useState } from 'react'
import QuizContainer from './components/QuizContainer'

function App() {
  const [iniciar, setIniciar] = useState(false)

  return (
    <main className="quiz-container">
      <section className="quiz-content">
        {iniciar ? (
          <QuizContainer />
        ) : (
          <>
            <h1>Prepara-te</h1>
            <p>Descobre as tuas aptidões e competências através de um teste interativo.</p>
            <h2>Testa as tuas aptidões</h2>
            <p>Este teste ajuda-te a descobrir as tuas competências.</p>
            <button className="btn-iniciar" onClick={() => setIniciar(true)}>Iniciar Teste</button>
          </>
        )}
      </section>
    </main>
  )
}

export default App

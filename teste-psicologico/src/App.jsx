import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './routes/Inicio';
import Teste from './routes/Teste';
import Resultado from './routes/Resultado';

function App() {
  return (
    <Router basename="/site-recrutamento-marinha/teste-psicologico">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </Router>
  );
}

export default App;

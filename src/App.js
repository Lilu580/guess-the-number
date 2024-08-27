import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = async () => {
    const response = await axios.post('http://localhost:5000/guess', { number: guess });
    setResult(response.data.message);
    if (response.data.message === 'Число вгадано') {
      setGameOver(true);
    }
  };

  const startNewGame = async () => {
    await axios.post('http://localhost:5000/start_game');
    setResult('');
    setGameOver(false);
    setGuess('');
  };

  useEffect(() => {
    startNewGame();
  }, []); // Порожній масив залежностей гарантує, що цей ефект виконається тільки один раз при монтуванні компонента

  return (
    <div>
      <h1>Вгадай число</h1>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
      />
      <button onClick={handleGuess} disabled={gameOver}>Відправити спробу</button>
      <div>{result}</div>
      {gameOver && <button onClick={startNewGame}>Почати знову</button>}
    </div>
  );
}

export default App;


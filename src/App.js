import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = async () => {
    const response = await axios.post('https://guess-the-number-backend-bm2d.onrender.com/guess', { number: guess });
    setResult(response.data.message);
    if (response.data.message === 'Число вгадано') {
      setGameOver(true);
    }
  };

  const startNewGame = async () => {
    await axios.post('https://guess-the-number-backend-bm2d.onrender.com/start_game');
    setResult('');
    setGameOver(false);
    setGuess('');
  };

  useEffect(() => {
    startNewGame();
  }, []); 

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


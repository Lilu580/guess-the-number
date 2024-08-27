import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css'

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

  const handleChange = (value) => {
    if (value > 100) {
      return setGuess(100)
    }

    if (value < 0) {
      return setGuess(0)
    }

    setGuess(value)
  }

  useEffect(() => {
    startNewGame();
  }, []); 

  return (
    <div className='container'>
      <h1>Вгадай число</h1>
      <TextField 
        type='number' 
        value={guess} 
        onChange={(e) => handleChange(e.target.value)}
        disabled={gameOver}
      />
      <Button 
        onClick={handleGuess} 
        disabled={gameOver} 
        variant="contained" 
        className='button'
        sx={{
          width: 210,
          marginTop: 2,
          '& .MuiOutlinedInput-root': { // стилі для кореневого елемента input
            '& fieldset': {
              borderColor: 'red', // червоний колір бордюра
            },
            '&:hover fieldset': {
              borderColor: 'blue', // синій колір бордюра при наведенні
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green', // зелений колір бордюра при фокусі
            },
          },
        }}
      >Відправити спробу</Button>
      <div>{result}</div>
      {gameOver && <Button onClick={startNewGame} variant="contained" className='button'>Почати знову</Button>}
    </div>
  );
}

export default App;


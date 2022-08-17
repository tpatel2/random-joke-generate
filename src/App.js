import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

const API = 'https://karljoke.herokuapp.com/jokes/random';

function App() {
  const [joke, setJoke] = useState('');
  const [setup, setSetup] = useState('');
  const [showPunchLineButton, setShowPunchLineButton] = useState(true);
  const [hidePunchLineButton, setHidePunchLineButton] = useState(false);
  const showPunchLine = () => {
    fetch(API)
      .then(res => res.json())
      .then(joke => setJoke(joke.punchline))
      .catch(err => console.error(err));
    setHidePunchLineButton(true);
    setShowPunchLineButton(false);
  }

  const hidePunchLine = () => {
    setShowPunchLineButton(false);
    setJoke(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetch(API)
        .then(res => res.json())
        .then(data => setSetup(data.setup))
        .catch(err => console.error(err));
    }, 5000);
    setHidePunchLineButton(false);
  }, []);

  const generateRandomJoke = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setSetup(data.setup))
      .catch(err => console.error(err));
    setHidePunchLineButton(false);
    setShowPunchLineButton(true);
  }

  return (
    <div className="App">
      <div className="header-detail">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
              <button className="generate-button text-white" onClick={generateRandomJoke}>Generate A New Random Joke</button>
              <a href="https://karljoke.herokuapp.com/" target="_blankß">View API Doc</a>
            </div>
          </nav>
        </header>
      </div>
      <div className="main-body">
        {setup ? '' : <p className="loading-joke"> Loading your Joke ... </p>}
          <p className="setup">{setup}</p>
        {showPunchLineButton ? 
          <button className="show-punch-line" onClick={showPunchLine}>Show Punch Line</button> : ''}
        {hidePunchLineButton ? 
          <button className="hide-punch-line" onClick={hidePunchLine}> Hide Punch Line</button> : ''}
          <p className="joke">{joke}</p> 
      </div>
    </div>
  );
}

export default App;

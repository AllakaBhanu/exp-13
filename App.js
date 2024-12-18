import React from 'react';
import Weather from './Weather';
import './App.css'; // Ensure this line is present in App.js

const App = () => {
  return (
    <div>
      <h1>Weather Forecast App</h1>
      <Weather />
    </div>
  );
};

export default App;
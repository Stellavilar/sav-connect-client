import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';


const rootReactElement = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const target = document.getElementById('root');
render(rootReactElement(), target);
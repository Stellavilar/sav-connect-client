import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-3-84-161-129.compute-1.amazonaws.com/';
// axios.defaults.baseURL = 'http://localhost:9090/';

const rootReactElement = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const target = document.getElementById('root');
render(rootReactElement(), target);
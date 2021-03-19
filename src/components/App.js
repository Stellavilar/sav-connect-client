import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/index.scss';

import Login from './Login';
import Header from './Header';
import Dashboard from './Dashboard';


const App = () => {
  return (
    <div className="App">
      <Route exact path='/'>
        <Login />
      </Route>
      <Route exact path='/dashboard'>
        <Header />
          <div className='main-page'> 
            <Dashboard /> 
          </div>
        <Dashboard />
      </Route>
    </div>
  );
};

export default App;

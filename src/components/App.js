import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/index.scss';

import Login from './Login';
import Header from './Header';
import Dashboard from './Dashboard';
import AdminMenu from './AdminMenu';
import WorkerMenu from './WorkerMenu';


const App = () => {

  //Check if user is admin or not
  const isAdmin =localStorage.getItem('isAdmin');

  return (
    <div className="App">
      <Route exact path='/'>
        <Login />
      </Route>
      <Route exact path='/dashboard'>
        <Header />
          <div className='main-page'> 
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
            <Dashboard /> 
          </div>
      </Route>
    </div>
  );
};

export default App;

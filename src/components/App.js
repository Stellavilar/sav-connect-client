import React, {useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import '../styles/index.scss';
import axios from 'axios';

import Login from './Login';
import Header from './Header';
import Dashboard from './Dashboard';
import AdminMenu from './AdminMenu';
import WorkerMenu from './WorkerMenu';


const App = () => {

  //Check if user is admin or not
  const isAdmin =localStorage.getItem('isAdmin');

  //Get all repairs sheet
  const [ repair, setRepair ] = useState([]);
  const repairsSheet = () => {
    axios.get('repairSheets')
      .then((res) => {
        setRepair(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => { repairsSheet() }, [])

  return (
    <div className="App">
      <Route exact path='/'>
        <Login />
      </Route>
      <Route exact path='/dashboard'>
        <Header />
          <div className='main-page'> 
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
            <Dashboard repair={repair} /> 
          </div>
      </Route>
    </div>
  );
};

export default App;

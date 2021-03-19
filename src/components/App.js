import React, {useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import '../styles/index.scss';
import axios from 'axios';

import Login from './Login';
import Header from './Header';
import Dashboard from './Dashboard';
import AdminMenu from './AdminMenu';
import WorkerMenu from './WorkerMenu';
import TagList from './TagList';
import TagForm from './TagForm';


const App = () => {

  //Check if user is admin and if there is a token on localStorage
  const isAdmin =localStorage.getItem('isAdmin');
  const token = localStorage.getItem('token');

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
      <Route exact path="/TagList" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <TagList />
          </div>
          </>
        }>
      </Route>
      <Route exact path="/TagForm" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <TagForm />
          </div>
          </>
        }>
        </Route>
    </div>
  );
};

export default App;

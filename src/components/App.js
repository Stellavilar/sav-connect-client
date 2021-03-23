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
import Activity from './Activity';
import StepFormOne from './RepairSheetForm/StepFormOne';
import RepairSheetForm from './RepairSheetForm/RepairSheetForm';


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
  //Get all customers
  const [ clients, setClients ] = useState([]);
  const allCustomers = () => {
    axios.get('customers')
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => { repairsSheet() }, []);
  useEffect(() => { allCustomers() }, []);

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
              <Activity />
            </div>
        </Route>
        <Route exact path="/RepairSheetForm" render={()=>!token ? <Redirect to='/'/> :  <>
        <Header />
        <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <StepFormOne clients={clients}/> 
          <Activity />
          </div>
          </>
        }>
        </Route>
        <Route exact path="/RepairSheet/edit/:order_number" render={()=>!token ? <Redirect to='/'/> :  <>
          <Header />
          <div className='main-page'>
          {isAdmin === 'true' ? <AdminMenu/> : <WorkerMenu/>}
          <RepairSheetForm />
          </div>
          </>
        }>
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

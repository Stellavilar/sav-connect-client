import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BurgerButtonAdmin = () => {
    const history = useHistory();

    const disconnect = () => {
        const token = localStorage.getItem('token');
        axios
            .get('logout', { headers: {
                Authorization: 'Bearer ' + token,
            },        
          }) 
          .then((res) => {
              localStorage.removeItem('token');
              history.push('/');
          })
          .catch((err) => {
              console.log(err)
          })
    };

    return (
        <div className='burger-button'>
            <Dropdown item text='' icon='bars'>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push('/dashboard')}>Liste des réparations</Dropdown.Item>
                    <Dropdown.Item onClick={() => history.push('/RepairSheetForm')}>Créer une fiche de réparation</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/ClientList')}>Liste des clients</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/clientForm')}>Créer une fiche client</Dropdown.Item>
                    <Dropdown.Item onClick={()=> history.push('/archives')}>Liste des archives</Dropdown.Item>
                    <Dropdown.Item onClick={disconnect} className='deconnect' >Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
};

export default BurgerButtonAdmin;
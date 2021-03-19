import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react'


const WorkerMenu = () => {
const history = useHistory();

    return (
        <div className='dashboard-menu'>
            <Menu vertical>
                <Dropdown item text='Réparations'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => history.push('/RepairSheetForm')}>Créer une fiche réparation</Dropdown.Item>
                        <Dropdown.Item onClick={() => history.push('/dashboard')}>Liste des réparations</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Clients'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/clientForm')}>Créer une fiche client</Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push('/ClientList')}>Liste des clients</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Archives'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/archives')}>Liste des archives</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
    );
};

export default WorkerMenu;
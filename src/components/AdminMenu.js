import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';


const AdminMenu = () => {
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
                <Dropdown item text='Employés'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/workerForm')}>Créer une fiche employé</Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push('/workerList')}>Liste des employés</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Tags'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/TagForm')}  >Créer un tag</Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push('/TagList')}>Liste des tags</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Actions'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/actionForm')}>Créer une action</Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push('/actions')}>Liste des actions</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Pannes'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push('/PanneForm')}>Créer un modèle de panne</Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push('/PanneList')}>Liste des modèles de pannes</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
    )
};
export default AdminMenu;
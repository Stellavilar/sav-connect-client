import React, {useState, useEffect} from 'react';
import { Segment, Header, List } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Worker = () => {
    const history = useHistory();

    const [ workerData, setWorkerData ] = useState({});

    let {id} = useParams();
    useEffect(() => {
        axios.get(`user/${id}`)
        .then((res) => {
            setWorkerData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id]);
    
    return (
        <div className='client'>
            <Segment>
                <div className='client-header'>
                    <p></p>
                    <Header as='h2'>Fiche Employé</Header>
                    <i className="fas fa-pencil-alt" onClick={() => history.push(`/workerEdit/${workerData.id}`)} id={workerData.id}></i>
                </div>
                <List>
                    <List.Item><span className='repair-span'>Nom: </span> {workerData.lastname} </List.Item>
                    <List.Item><span className='repair-span'>Prénom: </span> {workerData.firstname} </List.Item>
                    <List.Item><span className='repair-span'>Mail: </span> {workerData.mail} </List.Item>
                    <List.Item><span className='repair-span'>Statut: </span> {workerData.role_id === 1 ? 'Utilisateur' : 'Administrateur'} </List.Item>

                </List>
            </Segment>
        </div>
    );
};

export default Worker;
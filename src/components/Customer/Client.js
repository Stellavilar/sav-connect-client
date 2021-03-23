import React, {useState, useEffect} from 'react';
import { Segment, Header, List } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
    const history = useHistory();

    const [ customerData, setCustomerData ] = useState({});
    
    let {id} = useParams();

    useEffect(() => {
    axios.get(`customer/${id}`)
        .then((res) => {
            setCustomerData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    
    }, [id])
    
    return (
        <div className='client'>
            <Segment>
                <div className='client-header'>
                    <p></p>
                    <Header as='h2'>Fiche Client</Header>
                    <i className="fas fa-pencil-alt" onClick={() => history.push(`/clientEdit/${customerData.id}`)} id={customerData.id}></i>
                </div>
                <List>
                    <List.Item><span className='repair-span'>Nom: </span> {customerData.lastname} </List.Item>
                    <List.Item><span className='repair-span'>Prénom: </span> {customerData.firstname} </List.Item>
                    <List.Item><span className='repair-span'>Téléphone: </span> {customerData.phone} </List.Item>
                    { !customerData.phone_two ? <p></p> : <List.Item><span className='repair-span'>Téléphone 2: </span> {customerData.phone_two} </List.Item>}
                    { !customerData.mail ? <p></p> : <List.Item><span className='repair-span'>Mail: </span> {customerData.mail} </List.Item>}
                </List>
            </Segment>
        </div>
    );
};

export default Client;
import React, { useState } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const ClientEdit = () => {
    const history = useHistory();
    let {id} = useParams();
    /**Get old customer Data */
    const [ oldData, setOldData ] = useState('')
    axios.get(`customer/${id}`)
        .then((res) => {
            setOldData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    const [ customer, setCustomer ] = useState({
        firstname :'',
        lastname : '',
        phone : '',
        phone_two : '',
        mail : '',
    });

    const handleChange = (e) => { setCustomer({...customer, [e.target.name] : e.target.value}); }
    
    /**Handle click on cancel button*/
    const handleClickButton = () => { window.location.reload(false); };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`customer/edit/${id}`, customer , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res);
                history.push('/ClientList');
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    
    return (
        <div className='client-edit'>
            <Segment>
            <Header as='h2'>Modifier la fiche client de {oldData.lastname} {oldData.firstname}</Header>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Field>
                            <label>Nom</label>
                            <input 
                                type='text'
                                name='lastname'
                                onChange={handleChange}
                                placeholder={oldData.lastname}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Prénom</label>
                            <input 
                                type='text'
                                name='firstname'
                                onChange={handleChange}
                                placeholder={oldData.firstname}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Mail</label>
                            <input 
                                type='text'
                                name='mail'
                                onChange={handleChange}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Téléphone</label>
                            <input 
                                type='text'
                                name='phone'
                                onChange={handleChange}
                                placeholder={oldData.phone}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Téléphone 2</label>
                            <input 
                                type='text'
                                name='phone_two'
                                onChange={handleChange}
                                />
                        </Form.Field>
                        <div className='buttons'>
                            <Button color='teal'>Valider</Button>
                            <Button color='red' onClick={handleClickButton}>Annuler</Button>
                        </div>
                </Form>
            </Segment>
        </div>
    );
};

export default ClientEdit;
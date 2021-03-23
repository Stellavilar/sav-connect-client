import React, { useState } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const WorkerEdit = () => {
    const history = useHistory();
    let {id} = useParams();
    /**Get old worker Data */
    const [ oldData, setOldData ] = useState('')
    axios.get(`user/${id}`)
        .then((res) => {
            setOldData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    const [ worker, setWorker ] = useState({
        firstname :'',
        lastname : '',
        mail : '',
        password:'',
    });
    const [ errorMessage, setErrorMessage ] = useState(null);

    const handleChange = (e) => { setWorker({...worker, [e.target.name] : e.target.value}); }
    
    /**Handle click on cancel button*/
    const handleClickButton = () => { window.location.reload(false); };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`user/edit/${id}`, worker , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res);
                if(res.data) {
                    history.push('/workerList');
                    window.location.reload(false);
                }else{
                    setErrorMessage(' * Mot de passe incorrect')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };
    
    return (
        <div className='client-edit'>
            <Segment>
            <Header as='h2'>Modifier la fiche employé de {oldData.lastname} {oldData.firstname}</Header>
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
                            <label>Saisissez votre mot de passe pour confirmer:</label>
                            <input 
                                type='password'
                                name='password'
                                onChange={handleChange}
                                />
                        </Form.Field>
                        { errorMessage && <p className='error-message'>{errorMessage}</p> }

                        <div className='buttons'>
                            <Button color='teal'>Valider</Button>
                            <Button color='red' onClick={handleClickButton}>Annuler</Button>
                        </div>
                </Form>
            </Segment>
        </div>
    );
};

export default WorkerEdit;
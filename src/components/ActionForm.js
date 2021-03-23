import React, { useState } from 'react';
import { Header, Form, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';

const ActionForm = () => {

    /**Input value */
    const [ actionData, setActionData ] = useState('');
    /**Confirm Message */
    const [ confirmMessage, setConfirmMessage ] = useState('');
    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('action/add',  {name: actionData} , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            setConfirmMessage('* Action enregistrée avec succès !');
        })
        .catch((err) => {
            console.log(err);
        })
        e.target.reset();
    };

    return (
        <div className='panne-form'>
            <Segment>
                <Header as='h2'>Créer une action</Header>
                    <Form
                        onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Nom de l'action :</label>
                            <input 
                                type='text'
                                name='name'
                                onChange={(e) => setActionData(e.target.value)}
                                />
                        </Form.Field>
                        <div className='buttons'>
                                <Button color='teal'>Valider</Button>
                                <Button color='red' onClick={handleClick}>Annuler</Button>
                                { confirmMessage && <p className='error-message'>{confirmMessage}</p> }
                        </div>
                    </Form>
            </Segment>
        </div>
    )
};

export default ActionForm;
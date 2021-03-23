import React, { useState } from 'react';
import { Header, Form, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';

const PanneForm = () => {

    /**Input value */
    const [ panneData, setPanneData ] = useState('');
    /**Confirm Message */
    const [ confirmMessage, setConfirmMessage ] = useState('');
    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('panne/add',  {title: panneData} , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            setConfirmMessage('* Panne enregistrée avec succès !');
        })
        .catch((err) => {
            console.log(err);
        })
        e.target.reset();
    };

    return (
        <div className='panne-form'>
            <Segment>
                <Header as='h2'>Créer un modèle de panne</Header>
                    <Form
                        onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Nom de la panne :</label>
                            <input 
                                type='text'
                                name='title'
                                onChange={(e) => setPanneData(e.target.value)}
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

export default PanneForm
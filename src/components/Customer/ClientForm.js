import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ClientForm = () => {
    const history = useHistory();

    const [ customerData, setCustomerData ] = useState({
        firstname :'',
        lastname : '',
        phone : '',
        phone_two : '',
        mail : '',
    });

    const handleChange = (e) => {
        setCustomerData({...customerData, [e.target.name] : e.target.value});
    };
    /**Handle click on cancel button*/
    const handleClickButton = () => {
        window.location.reload(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('customer/add', customerData , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
          console.log(res)
          history.push('/ClientList');
          window.location.reload(false);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    /**Form validaton */
    const firstRender = useRef(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ disable, setDisabled ] = useState(true);

    useEffect(() => {
        const formValidation = () => {
            if(!customerData.firstname || !customerData.lastname || !customerData.phone ){
                setErrorMessage('* Vous n\'avez pas complété tous les champs nécessaires')
                return true
            }else{
                setErrorMessage(null);
                return false;
            }
        }
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        setDisabled(formValidation())
    }, [ customerData.lastname, customerData.firstname, customerData.phone ]);

    return (
        <div className='client-form'>
            <Segment>
                <Header as='h2'>Créer une fiche client</Header>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Field>
                        <label>Nom *</label>
                        <input 
                            type='text'
                            name='lastname'
                            onChange={handleChange}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Prénom *</label>
                        <input 
                            type='text'
                            name='firstname'
                            onChange={handleChange}
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
                        <label>Téléphone *</label>
                        <input 
                            type='text'
                            name='phone'
                            onChange={handleChange}
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
                        <Button color='teal' disabled={disable}>Valider</Button>
                        <Button color='red' onClick={handleClickButton}>Annuler</Button>
                    </div>
                    { errorMessage && <p className='error-message'>{errorMessage}</p>}
                    * Champs obligatoires
                </Form>
            </Segment>
        </div>
    );
};

export default ClientForm;
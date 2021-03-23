import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Header, Segment, Checkbox } from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import validatePassword from '../../utils/password.utils';
import validateMail from '../../utils/mail.utils';

const WorkerForm = () => {
    const history = useHistory();

    const [ firstnameData, setFirstnameData ] = useState('');
    const [ lastnameData, setLastnameData ] = useState('');
    const [ mailData, setMailData ] = useState('');
    const [ passwordData, setPasswordData ] = useState('');
    
    /**Checkbox state */
    const [checkValue, setCheckValue ] = useState(false);
    const handleChangeCheckbox = (e, { value }) => setCheckValue({value});

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('user/add', { firstname: firstnameData, lastname: lastnameData, mail: mailData, password: passwordData, role_id: checkValue.value}  , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            if(res.data.error) {
                return setErrorMessage(' * Erreur, veuillez recommencer')
            }
            history.push('/workerList');
            window.location.reload(false);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    /**Form validaton */
    const firstRender = useRef(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ confirmPassword, setConfirmPassword ] = useState('');

    useEffect(() => {
        const formValidation = () => {
            if(lastnameData === "" || firstnameData === "" || passwordData === ""){
                setErrorMessage('* Vous n\'avez pas complété tous les champs nécessaires')
            }else if( passwordData !== confirmPassword ){
                setErrorMessage('* Mot de passe incorrect')
            }else if( !validatePassword.validate(passwordData)){
                setErrorMessage(' * Votre mot de passe doit contenir une majuscule, un chiffre et un caractère spécial')
            }else if( ! validateMail.validate(mailData)){
                setErrorMessage(' * Mail incorrect')
            }else{
                setErrorMessage(null);
            }
        }
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        formValidation();
    }, [ lastnameData, firstnameData, passwordData, mailData , confirmPassword]);


    return (
        <div className='worker-form'>
            <Segment>
                <Header as='h2'>Créer un compte </Header>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Field>
                        <label>Nom</label>
                        <input 
                            type='text'
                            name='lastname'
                            onChange={(e) => setLastnameData(e.target.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Prénom</label>
                        <input 
                            type='text'
                            name='firstname'
                            onChange={(e) => setFirstnameData(e.target.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Adresse mail</label>
                        <input 
                            type='text'
                            name='mail'
                            onChange={(e) => setMailData(e.target.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Mot de passe</label>
                        <input 
                            type='password'
                            name='password'
                            onChange={(e) => setPasswordData(e.target.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirmez le mot de passe</label>
                        <input 
                            type='password'
                            name='password2'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Rôle</label>
                        <Checkbox 
                            radio
                            label='Administrateur'
                            name='role_id'
                            value='2'
                            checked={checkValue.value === '2'}
                            onChange={handleChangeCheckbox}
                        />
                        <Checkbox 
                            radio
                            label='Utilisateur'
                            name='role_id'
                            value='1'
                            checked={checkValue.value === '1'}
                            onChange={handleChangeCheckbox}
                        />
                    </Form.Field>
                    <div className='buttons'>
                        <Button color='teal'>Valider</Button>
                        <Button color='red' onClick={handleClick}>Annuler</Button>
                    </div>
                    { errorMessage && <p className='error-message'>{errorMessage}</p>}
                </Form>
            </Segment>
        </div>
    )
};

export default WorkerForm;
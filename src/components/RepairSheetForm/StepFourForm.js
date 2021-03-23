import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Checkbox, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';


const StepFourForm = () => {
    let {order_number} = useParams();

    /**Modal State */
    const [open, setOpen] = useState(false)
    const handleConfirm = () => {
        setOpen(false);
    };

    /**Form hooks */
    const [ diag, setDiag ] = useState('');
    const [ recall, setRecall ] = useState('');
    const [ devis, setDevis ] = useState('');

    /**Date time hooks */
    const [ selectedDate, setSelectedDate ] = useState(null);

    /**Confirm Button state */
    const [ disable, setDisabled ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const firstRender = useRef(true);


    /**Handle checkbox */
    const [ isAccepted, setIsAccepted] = useState('');
    const handleChangeCheckbox = (e, { value }) => setIsAccepted({value});

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepFour/${order_number}`, { amount_devis: devis, amount_diag: diag, recall_devis: recall , devis_is_accepted : isAccepted.value , date_devis: selectedDate._d, } , {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            setOpen(true);            
        })
        .catch((err) => {
            console.log(err);
        })
        e.target.reset();

    };

    useEffect(() => {
        const formValidation = () => {
            if(selectedDate === "" ){
                setErrorMessage('* Vous n\'avez pas complété tous les champs nécessaires');
                return true
            }else{
                setErrorMessage(null);
            }
        }
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        setDisabled(formValidation())
    }, [ selectedDate]);
   
    return (
        <div className='tab-form'>
            <Form
                onSubmit={handleSubmit} 
            >
                <Form.Field>
                    <label>Devis accepté ?</label>
                    <Checkbox
                        radio
                        label='oui'
                        name='devis_is_accepted'
                        value='oui'
                        checked={isAccepted.value === 'oui'}
                        onChange={handleChangeCheckbox}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='non'
                        name='devis_is_accepted'
                        value='non'
                        checked={isAccepted.value === 'non'}
                        onChange={handleChangeCheckbox}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Date du devis</label>
                        <Datetime
                            locale="fr"
                            utc={true}
                            placeholder="Saisissez une date" 
                            name="date_devis" 
                            value={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            />
                </Form.Field>
                <Form.Field>
                    <label>Montant du devis</label>
                    <input
                        type='number'
                        name='amount_devis'
                        onChange={(e) => setDevis(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Montant Total</label>
                    <input
                        type='number'
                        name='amount_diag'
                        onChange={(e) => setDiag(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Nombre de rappels au client</label>
                    <input
                        type='number'
                        name='recall_devis'
                        onChange={(e) => setRecall(e.target.value)}
                        />
                </Form.Field>
                { errorMessage && <p className="error">{errorMessage}</p>}
                <div className='buttons'>
                    <Button color='teal' disabled={disable} >Valider</Button>
                    <Button color='red' onClick={handleClick}>Annuler</Button>
                </div>
            </Form>
            <Confirm 
                    open={open}
                    onCancel={handleConfirm}
                    onConfirm={handleConfirm}
                    content=' Informations enregistrées '
                    cancelButton='Fermer'
                    confirmButton='OK'
                />
        </div>
    )
};

export default StepFourForm;
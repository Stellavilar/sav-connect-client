import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';

const StepThreeForm = () => {
    let {order_number} = useParams();

    /**Modal State */
    const [open, setOpen] = useState(false)
    const handleConfirm = () => {
        setOpen(false);
    };

    const [ getInter, setGetInter ] = useState ('');

    /**select date */
    const [ selectedDate, setSelectedDate ] = useState(null);

    /**Confirm Button state */
    const [ disable, setDisabled ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const firstRender = useRef(true);

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepThree/${order_number}`, { intervention: getInter , date_intervention: selectedDate._d } , {
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
                    <label>Détails de l'intervention</label>
                    <input
                        type='text'
                        name='intervention'
                        onChange={(e) => setGetInter(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Date d'intervention</label>
                    <Datetime
                            locale="fr"
                            utc={true}
                            placeholder="Saisissez une date" 
                            name="date_devis" 
                            value={selectedDate}
                            onChange={date => setSelectedDate(date)}
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

export default StepThreeForm;
import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Checkbox, Confirm } from 'semantic-ui-react';
import { useParams } from 'react-router';
import Datetime from 'react-datetime';
import axios from 'axios';

import 'moment/locale/fr';
import '../../styles/dateTime.scss';

const StepTwoForm = () => {
    let {order_number} = useParams();

    /**Modal State */
    const [open, setOpen] = useState(false)
    const handleConfirm = () => {
        setOpen(false);
    };

    /**Checkbox state */
    const [checkValue, setCheckValue ] = useState(false);
    const handleChangeCheckbox = (e, { value }) => setCheckValue({value});
    
   /**Confirm Button state */
    const [ disable, setDisabled ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const firstRender = useRef(true);

    /**Form */
    const [ deviceData, setDeviceData ] = useState('');
    const [ panneData, setPanneData ] = useState('');

    /**Date time hooks */
    const [ selectedDate, setSelectedDate ] = useState(null);

     /**Handle click on cancel button*/
     const handleClick = () => {
        window.location.reload(false);
    };
    /**Get pannes possibilities */
    const [ getPanne, setGetPanne ] = useState([]);
    const getPannes = () =>{
        axios.get('pannes')
            .then((res)=> {
                setGetPanne(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const showPannes = getPanne.map((panne) => <Checkbox
                                                    key={panne.id}
                                                    label={panne.title}
                                                    name='panne'
                                                    value={panne.title + ' / '}
                                                    checked={checkValue.value === panne.title + ' / '}
                                                    onChange={handleChangeCheckbox}
                                                />)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`repairSheet/stepTwo/${order_number}`, { panne: checkValue.value + panneData, device_brand: deviceData , interval_repair: selectedDate._d } ,{
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

useEffect(() => {getPannes()}, []);
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
                onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Modèle de l'appareil à réparer</label>
                    <input
                        type='text'
                        name='device_brand'
                        onChange={(e) => setDeviceData(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Descriptif Panne</label>
                        {showPannes}
                        <textarea
                        name='panne'
                        onChange={(e) => setPanneData(e.target.value)}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Délai de réparation</label>
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
    );
};

export default StepTwoForm;
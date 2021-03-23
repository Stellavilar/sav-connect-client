import React, { useState, useEffect, useRef } from 'react'
import { Button, Header, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const StepFormOne = ({clients}) => {
    const history = useHistory();
    /**Select options */
    const getOptions = clients.map((client) =>   
                <option value={client.id} key={client.id} >
                    {client.lastname +' '+ client.firstname +' '+ client.phone}
                </option>
        );
    ;
    /**Form */
    const [ repairData, setRepairData ] = useState({
        customer_id: '',
        firstname :'',
        lastname : '',
        phone : '',
        phone_two : '',
        mail : '',
        device_name : '',
    });
    
    const handleChange = (e) => {
        setRepairData({...repairData, [e.target.name] : e.target.value});
    };
    /**Handle click on cancel button*/
    const handleClickButton = () => {
        window.location.reload(false);
    };
    const handleSubmit = (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
        axios.post('repairSheet/stepOne', repairData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => {
            //find order number and edit repair sheet
            const order_number = res.data.order_number.order_number;
            history.push(`/RepairSheet/edit/${order_number}`)
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
            if(repairData.device_name === ""){
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
    }, [ repairData.lastname, repairData.firstname, repairData.phone, repairData.device_name ]);

    return (
        <div className='repair-sheet-form'>
            <Form
                onSubmit={handleSubmit}
            >
                <Header as='h2'>Choisissez un client</Header>
                <select name='customer_id' onChange={handleChange} placeholder='Sélectionnez un client'><option>Sélectionnez un client</option>{getOptions}</select>
                <Header as='h2'>Ou Créez un nouveau client</Header>
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
                    <label>Adresse e-mail</label>
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
                <Form.Field>
                    <Header as='h2'>Nom de l'appareil à réparer *</Header>
                    <input
                        type='text'
                        name='device_name'
                        onChange={handleChange}
                        />
                </Form.Field>
                { errorMessage && <p className='error-message'>{errorMessage}</p>}
                <div className='buttons'>
                    <Button color='teal' disabled={disable}>Valider</Button>
                    <Button color='red' onClick={handleClickButton}>Annuler</Button>
                </div>
                * Champs obligatoires
            </Form>
        </div>
    );
};

export default StepFormOne;
import React, { useState, useEffect } from 'react';
import { Segment, Header,Form, Button } from 'semantic-ui-react';
import axios from 'axios';

const ActionList = () => {

    const [ actionData, setActionData ] = useState([]);

    const Actions = () => {
        axios.get('actions')
            .then((res) => {
                setActionData(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
    };


    const [ getId, setGetId ] = useState('');
    const [ getValue, setGetValue ] = useState('')
    const onClickEdit = (e) => {
        setGetValue(e.target.title)
        setShowResults(true);
        setGetId(e.target.id);
    };

    /**Edit Panne and show new Form */
    const ShowEditForm = () => {

        const [ newAction, setNewAction ] = useState('')

        /**Handle click on cancel button*/
        const handleClick = () => {
            window.location.reload(false);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            axios.patch(`action/edit/${getId}`, {name: newAction})
                .then((res) => {
                    console.log(res);
                    window.location.reload(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        };

        return (
            <Form
                onSubmit={handleSubmit}
            >
                <Header as='h2'>Modifier l'action</Header>
                <Form.Field>
                    <label>Nom de la nouvelle action :</label>
                    <input 
                        type='text'
                        onChange={(e) => setNewAction(e.target.value)}
                        placeholder={getValue}
                        />
                </Form.Field>
                <div className='buttons'>
                    <Button color='teal'>Valider</Button>
                    <Button color='red' onClick={handleClick}>Annuler</Button>
                </div>
            </Form>
        )
    };

    /**Display div to show form edit */
    const [ showResults, setShowResults ] = useState(false);

    const getActions = actionData.map((action) => <Segment  className='panne-segment' key={action.id} color={action.is_blocked === 1 ? 'pink' : 'grey' } >{action.name}<div className='options'>{ action.is_blocked === 0 ? <i className="fas fa-pencil-alt" onClick={onClickEdit} id={action.id} title={action.name} ></i> : null}</div></Segment>)

    useEffect( () => {
        Actions()
    }, []);

    return (
        <div className='panne-list'>
            <Header as='h2'>Liste des actions crées :</Header>
            <Segment>{getActions}</Segment>
            { showResults ? <ShowEditForm/> : null}
        </div>
    )
};

export default ActionList;
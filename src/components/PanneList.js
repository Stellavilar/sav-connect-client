import React, { useState, useEffect } from 'react';
import { Segment, Header, Confirm, Form, Button } from 'semantic-ui-react';
import axios from 'axios';

const PanneList = () => {

    const [ panneData, setPanneData ] = useState([]);

    const Pannes = () => {
        axios.get('pannes')
            .then((res) => {
                setPanneData(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
    };

    /**Handle confirm window */
    const [ getOpen, setGetOpen ] = useState(false);
    const [ getId, setGetId ] = useState('');
    /**Remove panne */
    const onClickRemove = (e) => {
        setGetId(e.target.id);
        setGetOpen(true);
    };
    const handleCancel = () => {
        setGetOpen(false);
    }
    const handleConfirm = () => {
        axios.get(`panne/archive/${getId}`)
            .then((res) => {
                console.log(res);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            })
            setGetOpen(false)

    };

    const [ getId2, setGetId2 ] = useState('')
    const [ getValue, setGetValue ] = useState('')
    const onClickEdit = (e) => {
        setGetValue(e.target.title)
        setShowResults(true);
        setGetId2(e.target.id);
    };

    /**Edit Panne and show new Form */
    const ShowEditForm = () => {

        const [ newPanne, setNewPanne ] = useState('')

        /**Handle click on cancel button*/
        const handleClick = () => {
            window.location.reload(false);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            axios.patch(`panne/edit/${getId2}`, {title: newPanne})
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
                <Header as='h2'>Modifier la panne</Header>
                <Form.Field>
                    <label>Nom de la nouvelle panne :</label>
                    <input 
                        type='text'
                        onChange={(e) => setNewPanne(e.target.value)}
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

    const getPannes = panneData.map((panne) => <Segment  className='panne-segment' key={panne.id}>{panne.title}<div className='options'><i className="far fa-trash-alt" onClick={onClickRemove} id={panne.id} ></i><i className="fas fa-pencil-alt" onClick={onClickEdit} id={panne.id} title={panne.title} ></i></div></Segment>)

    useEffect( () => {
        Pannes()
    }, []);

    return (
        <div className='panne-list'>
            <Header as='h2'>Liste des pannes crées :</Header>
            <Segment>{getPannes}</Segment>
            <Confirm 
                    open={getOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    content=' Êtes-vous sûr de vouloir supprimer cette panne?'
                    cancelButton='Annuler'
                    confirmButton='OK'
                />
            { showResults ? <ShowEditForm/> : null}
        </div>
    )
};

export default PanneList;
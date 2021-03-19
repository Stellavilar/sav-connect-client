import React, { useState, useEffect } from 'react';
import { Segment, Header, Form, Button, Confirm } from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';

import axios from 'axios';

const Taglist = () => {

    /**Show form to edit tag */
    const ShowDiv = () => {
        /**React color state */
        const [color, setColor] = useState();
        const [ getTitle, setGetTitle ] = useState('');
    
        /**Handle click on cancel button*/
        const handleClick = () => {
            window.location.reload(false);
        };
        /**Edit tag */
        const handleSubmit = (e) => {
            e.preventDefault();
            const tagId = getId;
            axios.patch(`tag/edit/${tagId}`, {title: getTitle, color: color })
                .then((res)=>{
                    console.log(res)
                    window.location.reload(false);
                })
                .catch((err)=> {
                    console.log(err)
                })
        };
           /**Form to edit tag */
        return (
            <div className='tag-form'>
                        <Header as='h2'>Modifier le Tag</Header>
                        <Form
                            onSubmit={handleSubmit}
                        >
                            <Form.Field>
                                <label>Intitulé du tag</label>
                                <input
                                    type='text'
                                    name='title'
                                    onChange={(e)=> setGetTitle(e.target.value)}
                                    placeholder={getValue}
                                    />
                            </Form.Field>
    
                            <Form.Field>
                                <label>Couleur</label>
                            </Form.Field>
                            <TwitterPicker
                                name='color'
                                color={color}
                                onChangeComplete={(color) => setColor(color.hex)}
                                />
                            <div className='buttons'>
                                <Button color='teal'>Valider</Button>
                                <Button color='red' onClick={handleClick}>Annuler</Button>
                                {/* { errorMessage && <p className='error-message'>{errorMessage}</p> } */}
                            </div>
                        </Form>
                    </div>
        );
    };
    /**Display div to show form edit */
    const [ showResults, setShowResults ] = useState(false);

    /**Get tag id on double click */
    const [ getId, setGetId ] = useState('');

    /**On doucble click, change border color and show edit form */
    const [ getValue, setGetValue ] = useState('')
    const onClick = (e) => {
        e.target.style.border = 'solid red 2px';
        setGetValue(e.target.title)
        setShowResults(true);
        /**Get tag id */
        setGetId(e.target.id);
    };

    /**Handle confirm window */
    const [ getOpen, setGetOpen ] = useState(false);
    const [ getId2, setGetId2 ] = useState('');
    
    /**Function to remove tag */
    const onClickRemove = (e) => {
        setGetId2(e.target.id);
        setGetOpen(true);
    };

    const handleConfirm = () => {
        const tagId2 = getId2
        axios.get(`tag/archive/${tagId2}`)
        .then((res) => {
            console.log(res);
            window.location.reload(false);
            console.log('supprimé')
        })
        .catch((err) => {
            console.log(err);
        })
        setGetOpen(false)
    };
    const handleCancel = () => {
        setGetOpen(false);
    }

    /**Show all tags */
    const [ tagData, setTagData ] = useState([]);
    const Tags = () => {
        axios.get('tags')
            .then((res) => {
                setTagData(res.data);
            })
            .catch((err)=> {
                console.log(err);
            })
    };


    const getTags = tagData.map((tag)=> 
        <div className='tag' key={tag.id} style={{backgroundColor: `${tag.color}` }} onDoubleClick={onClick} id={tag.id} title={tag.title} >{tag.title}<div onClick={onClickRemove}  ><i className="far fa-times-circle" id={tag.id}></i></div></div>);
    
    useEffect(() => {Tags()}, [])

    return (
        <div className='tag-list'>
            <Segment>
                <Header as='h2'>Liste des Tags</Header>
                <p>Pour modifier un tag, double cliquez dessus!</p>
                <div className='tags'>{getTags}</div>
                { showResults ? <ShowDiv /> : null}
                <Confirm 
                    open={getOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    content=' Êtes-vous sûr de vouloir supprimer ce tag?'
                    cancelButton='Annuler'
                    confirmButton='OK'
                />
            </Segment>
        </div>
    )
};


export default Taglist;
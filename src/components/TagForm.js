import React, {useState} from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { TwitterPicker } from 'react-color';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const TagForm = () => {
    const history = useHistory();

    const [ errorMessage, setErrorMessage ] = useState(null);
    const [color, setColor] = useState();
    const [ getTitle, setGetTitle ] = useState('');

    /**Handle click on cancel button*/
    const handleClick = () => {
        window.location.reload(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('tag/add', {title: getTitle, color: color })
            .then((res)=>{
                if(res.data.error) {
                    setErrorMessage(' * Merci de remplir tous les champs');
                }else{
                    history.push('/TagList')
                }
            })
            .catch((err)=> {
                console.log(err)
            })
    };

    return (
        <div className='tag-form'>
            <Segment>
                <Header as='h2'>Créer un Tag</Header>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Form.Field>
                        <label>Intitulé du tag</label>
                        <input
                            type='text'
                            name='title'
                            onChange={(e)=> setGetTitle(e.target.value)}
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
                        { errorMessage && <p className='error-message'>{errorMessage}</p> }
                    </div>
                </Form>
            </Segment>
        </div>
    );
};

export default TagForm;
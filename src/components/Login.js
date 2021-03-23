import React, {useState, useEffect, useRef} from 'react';
import { Button, Header, Form, Checkbox, Confirm } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../img/savLogo.png';
import axios from 'axios';

//utils that validate mail and password
import validatePassword from '../utils/password.utils';
import validateMail from '../utils/mail.utils';

const Login = () => { 
    const history = useHistory();

    /**Get User data */
    const [ userProfil, setUserProfil ] = useState({ mail: '', password: '' });

    /**Error messages */
    const [ errorMessage, setErrorMessage ] = useState(null);

    /**Display div to show form edit */
    const [ showResults, setShowResults ] = useState(false);

    const handleChange = (e) => {
        setUserProfil({...userProfil, [e.target.name] : e.target.value})
    };

    const showForm = () => {
        setShowResults(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('login', userProfil)
            .then((res) => {
                if(res.data.token){
                    if(res.data.isAdmin === true){
                        history.push('/dashboard');
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('isAdmin', true);
                        window.location.reload(false);
    
                    }else if(res.data.isAdmin === false){
                        history.push('/dashboard');
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('isAdmin', false);
                        window.location.reload(false);
    
                    }
                }else{
                    setErrorMessage(' * Identifiants incorrects')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    //On click create account, show new form to create an account:
    const ShowCreateAccountForm = () => {
        
        //Save form fields
        const [ firstnameData, setFirstnameData ] = useState([]);
        const [ lastnameData, setLastnameData ] = useState('');
        const [ mailData, setMailData ] = useState('');
        const [ passwordData, setPasswordData ] = useState('');

        //Open confirm component after the account is created
        const [ getOpen, setGetOpen ] = useState(false);
        const handleConfirm = () => {
            setGetOpen(false);
            window.location.reload(false);
        };

        /**Checkbox state */
        const [checkValue, setCheckValue ] = useState(false);
        const handleChangeCheckbox = (e, { value }) => setCheckValue({value});

        /**Handle click on cancel button*/
        const handleClick = () => {
            window.location.reload(false);
        };

        //on create account form submit
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
                setGetOpen(true);
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
            <div className="create-account">
                 <Form
                    onSubmit={handleSubmit}
                    className="account-form"
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
                    <Confirm 
                    open={getOpen}
                    onConfirm={handleConfirm}
                    content=' Compte crée avec succès! Vous pouvez vous connecter'
                    confirmButton='OK'
                />
                </Form>
            </div>
            
        )
    }

    return (
        <div className="login">
            <img src={logo} alt='logo'/>
            <div className="login-part">
                <div className="login-part-one">
                <Header as='h2'>Se connecter</Header>
                <Form
                        onSubmit={handleSubmit}
                >
                <Form.Field>
                    <label>Adresse e-mail</label>
                    <input
                        type='text'
                        name='mail'
                        onChange={handleChange}
                        />
                </Form.Field>
                <Form.Field>
                    <label>Mot de passe</label>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        />
                </Form.Field>
                { errorMessage && <p className='error-message'>{errorMessage}</p> }
                <div className='buttons'>
                    <Button color='teal'>Valider</Button>
                    <Link to={'/'}>
                        <Button color='red'>Annuler</Button>
                    </Link>
                </div>
                 </Form>
                </div>
                <div className="login-part-two">
                    <Header as='h2' className="connect" onClick={showForm} >Créer un compte </Header>
                    { showResults ? <ShowCreateAccountForm/> : null}
                </div>
            </div>   
        </div>
    )
};

export default Login;
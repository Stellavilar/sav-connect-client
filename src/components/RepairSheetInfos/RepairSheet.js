/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Header, Segment, List, Dimmer, Loader } from 'semantic-ui-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import PrintComponents from 'react-print-components';
import QRCode from 'react-qr-code';
import axios from 'axios';

const RepairSheet = () => {
    const history = useHistory();
 
    const [ customerData, setCustomerData ] = useState([]);
    const [ deviceData, setDeviceData ] = useState([]);
    const [ interData, setInterData ] = useState([]);
    const [ devisData, setDevisData ] = useState([]);
    const [ firstTag, setFirstTag ] = useState('');
    const [ secondTag, setSecondTag ] = useState('');
    const [ thirdTag, setThirdTag ] = useState('');

    /**Loader */
    const [ loading, setLoading ] = useState(false);

    let {id} = useParams();
    const getData = () => {
        axios.get(`repairSheet/stepOne/${id}`)
            .then((res)=> {
                setCustomerData(res.data[0]);
                setLoading(true);
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const getDevice = () => {
        axios.get(`repairSheet/stepTwo/${id}`)
            .then((res) => {
                setDeviceData(res.data[0]);
                setLoading(true);
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const getInter = () => {
        axios.get(`repairSheet/stepThree/${id}`)
            .then((res) => {
                setInterData(res.data[0]);
                setLoading(true);
            })
            .catch((err) => {
                console.log(err)
            })
    };
    const getDevis = () => {
        axios.get(`repairSheet/stepFour/${id}`)
            .then((res) => {
                setDevisData(res.data[0]);
                setLoading(true);
            })
            .catch((err) => {
                console.log(err)
            })
    };
    /**Get tags */
    const clientData = () => {
        axios.get(`repairSheet/stepOne/${id}`)
            .then((res)=> {
                axios.get(`repairSheet/tag/${res.data[0].id}`)
                .then((res1)=> {
                    setFirstTag(res1.data[0]);
                    setSecondTag(res1.data[1]);
                    setThirdTag(res1.data[2]);
                    setLoading(true);
                })      
            })
            .catch((err)=> {
                console.log(err);
            })
    };

    const urlQrcode = `https://stellavilar.github.io/sav-connect-client/#/RepairSheet/${id}`
    const qrSize = 180;

    useEffect(() => {getData()}, []);
    useEffect(() => {getDevice()}, []);
    useEffect(() => {getInter()}, []);
    useEffect(() => {getDevis()}, []);
    useEffect(() => {clientData()}, []);


    const date_devis = new Date(devisData.date_devis);
    const interval_repair = new Date(deviceData.interval_repair);
    const date_intervention = new Date(interData.date_intervention);


    return (
        <div className='repair-sheet'>
            <Segment>
                <div className='repair-sheet-one'>
                    <div className='repair-header'>
                        <div></div>
                        <Header as='h2'>Fiche de réparation n° : {customerData.order_number} </Header>
                        {loading ? [] :  <Dimmer active inverted><Loader inverted /></Dimmer> }
                        <div className='repair-icons'>
                            <i className="fas fa-pencil-alt" onClick={()=> history.push(`/RepairSheet/edit/${id}`)} ></i>
                            {/* Here is the part whiwh will be printed */}
                            <PrintComponents
                                trigger={<i className="fas fa-print"></i>} >
                                    <Header as='h2'>Fiche de réparation n° : {customerData.order_number} </Header>
                                    <p className='device'>{customerData.device_name}</p>
                                    <List.Item><span className='repair-span'>Nom: </span> {customerData.lastname} </List.Item>
                                    <List.Item><span className='repair-span'>Prénom: </span> {customerData.firstname} </List.Item>
                                    <List.Item><span className='repair-span'>Téléphone: </span> {customerData.phone} </List.Item>
                                    <QRCode
                                        size={qrSize}
                                        value={urlQrcode}
                                    />
                            </PrintComponents>
                        </div>
                    </div>
                    <div className='repair-sheet-device'>
                        <p className='device'>{customerData.device_name}</p>
                        { !deviceData.device_brand ? <p></p> : <p className='device'>{deviceData.device_brand}</p>}
                    </div>
                    <div className='repair-sheet-options'>
                        <QRCode
                            size={qrSize}
                            value={urlQrcode}
                        />
                        <div className='tag-area'>
                            { firstTag ? <div className='repar-sheet-tag' style={{backgroundColor: `${firstTag.color}` }}>{firstTag.title}</div> : null }
                            { secondTag ? <div className='repar-sheet-tag' style={{backgroundColor: `${secondTag.color}` }}>{secondTag.title}</div> : null}  
                            { thirdTag ? <div className='repar-sheet-tag' style={{backgroundColor: `${thirdTag.color}` }}>{thirdTag.title}</div> : null} 
                        </div>
                    </div>
                </div>
                <div className='repair-sheet-client'>
                    <Header as='h3'>Informations Client</Header>
                    <List>
                        <List.Item><span className='repair-span'>Nom: </span> {customerData.lastname} </List.Item>
                        <List.Item><span className='repair-span'>Prénom: </span> {customerData.firstname} </List.Item>
                        <List.Item><span className='repair-span'>Téléphone: </span> {customerData.phone} </List.Item>
                        { !customerData.phone_two ? <p></p> : <List.Item><span className='repair-span'>Téléphone 2: </span> {customerData.phone_two} </List.Item>}
                        { !customerData.mail ? <p></p> : <List.Item><span className='repair-span'>Mail: </span> {customerData.mail} </List.Item>}
                        { !devisData.recall_devis ? <p></p> : <List.Item><span className='repair-span'>Nombre de rappels au client: </span> {devisData.recall_devis} </List.Item>}
                    </List>
                </div>
                <div className='repair-sheet-repair'>
                    <Header as='h3'>Informations Réparation</Header>
                    <List>
                    <List.Item>
                            <List.Content>
                                { !deviceData.interval_repair ? null : <List.Header>Délai maximum de réparation:</List.Header> }
                                <List.Description> { !deviceData.interval_repair ? null : interval_repair.toLocaleDateString('fr-FR')} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !deviceData.panne ? <p></p> : <List.Header>Description panne</List.Header> }
                                <List.Description> {deviceData.panne} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !interData.intervention ? <p></p> : <List.Header>Description Intervention</List.Header>}
                                <List.Description> {interData.intervention} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !interData.date_intervention ? <p></p> : <List.Header>Date d'intervention</List.Header>}
                                <List.Description> {!interData.date_intervention ? null : date_intervention.toLocaleDateString('fr-FR')} </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
                <div className='repair-devis'>
                    <Header as='h3'>Informations Devis</Header>
                    <List>
                        <List.Item>
                            <List.Content>
                                { !devisData.devis_is_accepted ? <p></p> : <List.Header>Devis accepté ?</List.Header>}
                                <List.Description> {devisData.devis_is_accepted}  </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !devisData.date_devis ? <p></p> : <List.Header>Date devis : </List.Header>}
                                <List.Description>{!devisData.date_devis ? null : date_devis.toLocaleDateString('fr-FR')} </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !devisData.amount_devis ? <p></p> : <List.Header>Montant devis</List.Header>}
                                <List.Description className='amount'>{devisData.amount_devis}{ !devisData.amount_devis ? <p></p> : <p>€</p>}</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                { !devisData.amount_diag ? <p></p> : <List.Header>Montant total</List.Header>}
                                <List.Description className='amount'>{devisData.amount_diag}{ !devisData.amount_diag ? <p></p> : <p>€</p>}</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
            </Segment>
        </div>
    );
};

export default RepairSheet;
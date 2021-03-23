import React, { useState, useEffect } from 'react';
import { List, Header } from 'semantic-ui-react'
import { useParams } from 'react-router';
import axios from 'axios';

const StepOne = () => {
    /**Get data */
    const [ repairData, setRepairData ] = useState([]);
    let {order_number} = useParams();
    const getData = () => {
    axios.get (`repairSheet/stepOne/${order_number}`)
        .then((res) => {
            setRepairData(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getData()}, [])

    return (
        <div className='repair-sheet-infos'>
            <Header as='h2'>Fiche de réparation n° {repairData.order_number}</Header>
            <List>
                <List.Item>
                    <List.Icon name='laptop'/>
                    <List.Content>
                        <List.Header as='h3'>{repairData.device_name}</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='address card'/>
                    <List.Content>
                        <List.Header as='h4'>{repairData.lastname} {repairData.firstname}</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='phone'/>
                    <List.Content>
                        <List.Header as='h4'>{repairData.phone}</List.Header>
                    </List.Content>
                </List.Item>
                { !repairData.phone_two ? <p></p> : <List.Item>
                    <List.Icon name='phone'/>
                    <List.Content>
                        <List.Header as='h4'>{repairData.phone_two}</List.Header>
                    </List.Content>
                </List.Item>}
                { !repairData.mail ? <p></p> : <List.Item>
                    <List.Icon name='mail'/>
                    <List.Content>
                        <List.Header as='h4'>{repairData.mail}</List.Header>
                    </List.Content>
                </List.Item> }
            </List>
        </div>
    );
};

export default StepOne;
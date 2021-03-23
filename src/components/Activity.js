import React, { useState, useEffect } from 'react';
import { Segment, List, Header, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

const Activity = () => {

    /**Loader */
    const [ loading, setLoading ] = useState(false);

    const [ getActivity, setGetActivity ] = useState([]);
    const activities = () => {
        axios.get(`activity/10`)
            .then((res) => {
                setGetActivity(res.data);
                setLoading(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const generalActivities = getActivity.map((activity) =>
        <List.Item  key={activity.created_at}>
            <List.Icon name='bell'/>
            <List.Content>
                {activity.firstname} {activity.lastname} { activity.type === 'tag' ? <span>a ajouté le tag</span> : null} <span style={{color: activity.color}}>{activity.name}</span> <span style={{fontWeight: 'bold'}}>{activity.order_number}</span> le {new Intl.DateTimeFormat('fr-FR').format(new Date(activity.created_at))}
            </List.Content>
        </List.Item>
    );

    useEffect(() => {activities()}, []);

    return (
        <div className='activity'>
            <Segment>
                {loading ? [] :  <Dimmer active inverted><Loader inverted /></Dimmer> }
                <Header as='h2'>Historique</Header>
                <List>
                    {generalActivities}
                </List>
            </Segment>
        </div>
    );
};

export default Activity;
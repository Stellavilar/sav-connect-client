import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const WorkerList = ({workers}) => {
    const history = useHistory();
    
    const getWorkers = workers.map((worker) =>
        <Grid.Row className='grid-details' key={worker.id} >
            <Grid.Column>
                <div className='grid-details'>{worker.lastname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{worker.firstname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{worker.mail}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{worker.role_id === 1 ? 'Utilisateur' : 'Administrateur'}</div>
            </Grid.Column>
            <Grid.Column>
            <i className="far fa-eye" onClick={() => history.push(`/user/${worker.id}`)}></i>
            <i className="far fa-trash-alt"></i>
            </Grid.Column>
        </Grid.Row>
    );

    return (
        <div className='client-list'>
            <Header as='h2'>Liste des employés</Header>
            <div className='dashboard'>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Nom</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Prénom</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Mail</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Statut</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Options</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment className='grid-details'>
                    <Grid columns={5}>
                        {getWorkers}
                    </Grid>
                </Segment>
                
            </div>
        </div>
    );
};

export default WorkerList;
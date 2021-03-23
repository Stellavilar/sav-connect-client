import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const ClientList  = ({clients}) => {
    const history = useHistory();

    const customers = clients.map((client) =>
        <Grid.Row className='grid-details' key={client.id} >
            <Grid.Column>
                <div className='grid-details'>{client.lastname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{client.firstname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{client.mail}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{client.phone}</div>
            </Grid.Column>
            <Grid.Column>
            <i className="far fa-eye" onClick={() => history.push(`/client/${client.id}`)} ></i>
            <i className="far fa-trash-alt"></i>
            </Grid.Column>
        </Grid.Row>
    
    );

    return (
        <div className='client-list'>
            <Header as='h2'>Liste des clients</Header>
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
                            <Segment>Téléphone</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Options</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment className='grid-details'>
                    <Grid columns={5}>
                        {customers}
                    </Grid>
                </Segment>
                
            </div>
        </div>
    );
};

export default ClientList;
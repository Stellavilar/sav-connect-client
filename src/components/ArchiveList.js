import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const ArchiveList = ({archive}) => {
    const history = useHistory();

    const getArchives = archive.map((archives) =>
    <Grid.Row className='grid-details' key={archives.id} >
    <Grid.Column>
        <div className='grid-details'>{archives.order_number}</div>
    </Grid.Column>
    <Grid.Column>
        <div className='grid-details'>{archives.customer.lastname} {archives.customer.firstname}</div>
    </Grid.Column>
    <Grid.Column>
        <div className='grid-details'>{archives.device_name}</div>
    </Grid.Column>
    <Grid.Column>
        <div className='grid-details'>{archives.device_brand}</div>
    </Grid.Column>
    <Grid.Column>
        <div className='grid-details'>{new Intl.DateTimeFormat('fr-FR').format(new Date(archives.date_enter))}</div>
    </Grid.Column>
    
    <Grid.Column>
    <i className="far fa-eye" onClick={()=> history.push(`/RepairSheet/${archives.order_number}`)} ></i>
    </Grid.Column>
</Grid.Row>
    );

    return (
        <div className='archive-list'>            
            <Header as='h2'>Liste des fiches archivées</Header>
                <div className='dashboard'>
                    <Grid columns='equal'>
                        <Grid.Row>
                        <Grid.Column>
                                <Segment>N° de billet</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>Client</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>Appareil</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>Modèle</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>Entrée en SAV</Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>Options</Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Segment className='grid-details'>
                        <Grid columns={6}>
                            {getArchives}
                        </Grid>
                    </Segment>
                </div>
        </div>
    );
};

export default ArchiveList;
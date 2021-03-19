import React, {useState} from 'react';
import { Grid, Segment, Confirm, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({repair}) => {

    const history = useHistory();

    /**Display row when archive */
    const [ getOpen, setGetOpen ] = useState(false);
    const [getId, setGetId ] = useState(false);
    const removeFromList = (e) => {
        setGetId(e.target.id);
        setGetOpen(true);
    };
    const handleConfirm = () => {
        axios.get(`repairSheet/archive/${getId}`, {
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload(false);

        })
        .catch((err) => {
            console.log(err);
        })
    };
    const handleCancel = () => {
        setGetOpen(false);
    };

    //Map repairs sheet
    const repairsSheet = repair.map((rep) =>
        <Grid.Row className='grid-details' key={rep.id}>
            <Grid.Column>
                <div className='grid-details'>{rep.order_number}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.customer.lastname} {rep.customer.firstname}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.device_name}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{rep.device_brand}</div>
            </Grid.Column>
            <Grid.Column>
                <div className='grid-details'>{new Intl.DateTimeFormat('fr-FR').format(new Date(rep.date_enter))}</div>
            </Grid.Column>
            <Grid.Column className='tags'>
                {rep.tags[0] ? <div className='dashboard-tag' key={rep.tags[0].id} style={{backgroundColor: `${rep.tags[0].color}` }}>{rep.tags[0].title}</div> : null}
                {rep.tags[1] ? <div className='dashboard-tag' key={rep.tags[1].id} style={{backgroundColor: `${rep.tags[1].color}` }}>{rep.tags[1].title}</div> : null}
                {rep.tags[2] ? <div className='dashboard-tag' key={rep.tags[2].id} style={{backgroundColor: `${rep.tags[2].color}` }}>{rep.tags[2].title}</div> : null}
            </Grid.Column>
            <Grid.Column className='options'>
            <i className="far fa-eye" onClick={()=> history.push(`/RepairSheet/${rep.order_number}`)} ></i>
            <i className="fas fa-pencil-alt" onClick={()=> history.push(`/RepairSheet/edit/${rep.order_number}`)}></i>
            <i className="far fa-trash-alt" onClick={removeFromList} id={rep.id} ></i>
            </Grid.Column>
        </Grid.Row> 
    );

    return (
        <div className="main-page">
            <div className="dashboard">
            <Header as='h1'>Liste des réparations</Header>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Ref</Segment>
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
                            <Segment>Entrée</Segment>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment>Tags</Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>Options</Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment className='grid-details'>
                    <Grid columns={7}>
                        {repairsSheet}
                    </Grid>
                </Segment>
                <Confirm 
                    open={getOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    content=' Êtes-vous sûr de vouloir archiver cette fiche ?'
                    cancelButton='Annuler'
                    confirmButton='OK'
                />
            </div>
        </div>
    )
};

export default Dashboard;
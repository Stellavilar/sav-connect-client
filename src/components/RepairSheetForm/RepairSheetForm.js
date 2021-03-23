import React from 'react'
import { Tab } from 'semantic-ui-react'

import StepOne from '../RepairSheetInfos/StepOne';
import StepTwoForm from '../RepairSheetForm/StepTwoForm';
import StepThreeForm from '../RepairSheetForm/StepThreeForm';
import StepFourForm from '../RepairSheetForm/StepFourForm';
import StepFiveForm from '../RepairSheetForm/StepFiveForm';


const panes = [
  { menuItem: 'Client',render: () => <Tab.Pane><StepOne /></Tab.Pane> },
  { menuItem: 'Appareil', render: () => <Tab.Pane><StepTwoForm /></Tab.Pane>},
  { menuItem: 'Intervention', render: () => <Tab.Pane><StepThreeForm /></Tab.Pane> },
  { menuItem: 'Devis', render: () => <Tab.Pane><StepFourForm /></Tab.Pane> },
  { menuItem: 'Options', render: () => <Tab.Pane><StepFiveForm/></Tab.Pane> },
]

const RepairSheetForm = () => {
    return (
        <div className='tab'>
            <Tab panes={panes} />
        </div>
    )
}

export default RepairSheetForm;
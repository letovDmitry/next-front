import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BoostCounter from '../BoostCounter/BoostCounter';
// import styles from '../Calculator/calculator.module.scss';

const tabNamesCs = [
  { id: 'cs2_premier', name: "Премьер" },
  { id: 'cs2_premier_calibration', name: "Премьер калибровка" },
  { id: 'cs2_rank', name: "По званию" },
  { id: 'cs2_wins', name: "По победам" },
  { id: 'cs2_partners_rank', name: "Напарники по званию" },
  { id: 'cs2_partners_wins', name: "Напарники по победам" },
  { id: 'cs2_partners_calibration', name: "Напарники калибровка" }
];

const tabNamesFace = [
  { id: 'faceit_elo', name: "По эло" },
  { id: 'faceit_level', name: "По уровню" },
  { id: 'faceit_wins', name: "По победам" },
  { id: 'faceit_calibration', name: "Калибровка" },
];

const BoostTabs = () => {
  return (
    <div id='calcs'>
      <Tabs>  
        <div className="container">
          <TabList>
            <Tab>CS2</Tab>
            <Tab>FaceIT</Tab>
          </TabList>
        </div>
        <TabPanel>
          <BoostCounter tabNames={tabNamesCs} />
        </TabPanel>
        <TabPanel>
          <BoostCounter tabNames={tabNamesFace} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default BoostTabs;

import React, { useState } from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./boostscrolledtabs.css";
import PremierCalc from "../Cs2CalculatorTypes/PremierCalc/PremierCalc";
import PremierCalibrationCalc from "../Cs2CalculatorTypes/PremierCalibrationCalc/PremierCalibrationCalc";
import RankCalc from "../Cs2CalculatorTypes/ByRankCalc/ByRankCalc";
import ByWinsCalc from "../Cs2CalculatorTypes/ByWinsCalc/ByWinsCalc";
import PartnersInRankCalc from "../Cs2CalculatorTypes/PartnersInRankCalc/PartnersInRankCalc";
import PartnersInWinCalc from "../Cs2CalculatorTypes/PartnersInWinCalc/PartnersInWinCalc";
import PartnersCalibrationCalc from "../Cs2CalculatorTypes/PartnersCalibrationCalc/PartnersCalibrationCalc";
import FiByLevelCalc from "../FaceItCalculatorTypes/FiByLevelCalc/FiByLevelCalc";
import FiByWinsCalc from "../FaceItCalculatorTypes/FiByWinsCalc/FiByWinsCalc";
import FiCalibrationCalc from "../FaceItCalculatorTypes/FiCalibrationCalc/FiCalibrationCalc";
import FiEloCalc from "../FaceItCalculatorTypes/FiEloCalc/FiEloCalc";

type BoostScrolledTabsProps = {
  tabNames: { id: string; name: string }[];
};

const BoostScrolledTabs: React.FC<BoostScrolledTabsProps> = ({ tabNames }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onTabClick = (e: React.MouseEvent, index: number) => {
    setActiveTab(index);
  };

  const renderCalculator = (id: string) => {
    switch (id) {
      case "cs2_premier":
        return <PremierCalc />;
      case "cs2_premier_calibration":
        return <PremierCalibrationCalc />;
      case "cs2_rank":
        return <RankCalc />;
      case "cs2_wins":
        return <ByWinsCalc />;
      case "cs2_partners_rank":
        return <PartnersInRankCalc />;
      case "cs2_partners_wins":
        return <PartnersInWinCalc />;
      case "cs2_partners_calibration":
        return <PartnersCalibrationCalc />;
      case "faceit_elo":
        return <FiEloCalc />;
      case "faceit_level":
        return <FiByLevelCalc />;
      case "faceit_wins":
        return <FiByWinsCalc />;
      case "faceit_calibration":
        return <FiCalibrationCalc />;
      default:
        return null;
    }
  };

  const TabScreen = ({ activeTab, idx, children, ...props }) => {
    return (
      <div
        className={`animate__animated ${
          activeTab === idx ? "animate__fadeInLeft" : ""
        }`}
        role="tabpanel"
        {...props}
      >
        {activeTab === idx && <div className="mx-4">{children}</div>}
      </div>
    );
  };

  return (
    <div className="App">
      <Tabs
        activeTab={activeTab}
        onTabClick={onTabClick}
        hideNavBtnsOnMobile={false}
        rightBtnIcon={">"}
        leftBtnIcon={"<"}
      >
        {tabNames.map((tab, index) => (
          <Tab key={tab.id}>{tab.name}</Tab>
        ))}
      </Tabs>

        {tabNames.map((tab, index) => (
          <TabScreen
            activeTab={activeTab}
            idx={index}
            key={tab.id}
          >
            {renderCalculator(tab.id)}
          </TabScreen>
        ))}
    </div>
  );
};

export default BoostScrolledTabs;

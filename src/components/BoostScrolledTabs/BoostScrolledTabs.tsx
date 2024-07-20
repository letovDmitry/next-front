import React, { useState } from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./boostscrolledtabs.css";
import PremierCalc from "../Сs2CalculatorTypes/PremierCalc/PremierCalc";
import PremierCalibrationCalc from "../Сs2CalculatorTypes/PremierCalibrationCalc/PremierCalibrationCalc";
import RankCalc from "../Сs2CalculatorTypes/ByRankCalc/ByRankCalc";
import ByWinsCalc from "../Сs2CalculatorTypes/ByWinsCalc/ByWinsCalc";
import PartnersInRankCalc from "../Сs2CalculatorTypes/PartnersInRankCalc/PartnersInRankCalc";
import PartnersInWinCalc from "../Сs2CalculatorTypes/PartnersInWinCalc/PartnersInWinCalc";
import PartnersCalibrationCalc from "../Сs2CalculatorTypes/PartnersCalibrationCalc/PartnersCalibrationCalc";
import FiByLevelCalc from "../FaceItCalculatorTypes copy/FiByLevelCalc/FiByLevelCalc";
import FiByWinsCalc from "../FaceItCalculatorTypes copy/FiByWinsCalc/FiByWinsCalc";
import FiCalibrationCalc from "../FaceItCalculatorTypes copy/FiCalibrationCalc/FiCalibrationCalc";
import FiEloCalc from "../FaceItCalculatorTypes copy/FiEloCalc/FiEloCalc";

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

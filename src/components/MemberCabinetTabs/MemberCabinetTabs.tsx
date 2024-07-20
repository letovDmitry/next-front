import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountSettings from "../AccountSettings/AccountSettings";
import styles from "../AccountSettings/settings.module.scss";
import Orders from "../Orders/Orders";
import { IUser } from "@/store/services/userApi";
import Link from "next/link";

interface IProps {
  user: IUser | undefined;
}

const MemberCabinetTabs = ({ user }: IProps) => {
  return (
    <Tabs>
      <div className="container flexible">
        <TabList>
          <Tab>Настройки аккаунта</Tab>
          <Tab>Заказы</Tab>
        </TabList>
        <Link href="/#calcs" className={styles.boost}>Заказать новый буст</Link>
      </div>
      <div className="tabWrapper">
        <TabPanel>
          <div className="animate__animated animate__fadeInLeft">
            <AccountSettings user={user} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="animate__animated animate__fadeInLeft">
            <Orders />
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default MemberCabinetTabs;

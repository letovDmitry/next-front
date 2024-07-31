"use client"
import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountSettings from "../AccountSettings/AccountSettings";
import NewOrders from "../NewOrders/NewOrders";
import Orders from "../Orders/Orders";
import { IUser } from "@/store/services/userApi";
import { useGetNewOrdersForBoosterQuery } from "@/store/services/ordersApi";
import { socket } from "@/lib/socket";
import styles from './styles.module.scss'

interface IProps {
  user: IUser | undefined;
}

const BoosterCabinetTabs = ({ user }: IProps) => {
  const { data: orders, refetch } = useGetNewOrdersForBoosterQuery()

  useEffect(() => {
    const onNewOrder = (data) => {
      refetch()
    };

    socket.on("newOrder", onNewOrder);

    return () => {
      socket.off("newOrder", onNewOrder);
    };
  }, [user]);

  return (
    <Tabs>
      <div className="container flexible">
        <TabList>
          <Tab>Настройки аккаунта</Tab>
          <Tab>Активные заказы</Tab>
          <Tab>
            <div className={styles.newOrder}>
              <div className={user && orders && orders.filter(o => !o.seenBy || !o.seenBy.map(u => u.id).includes(user.id)).length > 0 ? styles.unseenmsg : {}}>{user && orders && orders.filter(o => !o.seenBy || !o.seenBy.map(u => u.id).includes(user.id)).length > 0 && orders.filter(o => !o.seenBy || !o.seenBy.map(u => u.id).includes(user.id)).length}</div>
              <div>Новые заказы</div>
            </div>
          </Tab>
        </TabList>
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
        <TabPanel>
          <div className="animate__animated animate__fadeInLeft">
            <NewOrders />
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default BoosterCabinetTabs;

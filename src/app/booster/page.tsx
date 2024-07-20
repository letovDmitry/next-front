"use client";

import React from "react";
import styles from "./booster.module.scss";
import BoosterCabinetTabs from "@/components/BoosterCabinetTabs/BoosterCabinetTabs";
import { useGetMeQuery } from "@/store/services/userApi";

const page = () => {
  const { data: user } = useGetMeQuery();
  return (
    <div className={styles.member}>
      <div className="container">
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.heading}>
              <div className={styles.welcome}>Добро пожаловать,</div>
              <div className={styles.username}>{user?.email || ""}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabWrapper}>
        <BoosterCabinetTabs user={user} />
      </div>
    </div>
  );
};

export default page;

"use client";

import React from "react";
import styles from "./member.module.scss";
import Link from "next/link";
import MemberCabinetTabs from "@/components/MemberCabinetTabs/MemberCabinetTabs";
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
            <div className={styles.content}>
              <div className={styles.review}>
                <div className={styles.text}>Оставить отзыв бустеру</div>
                <a target="_blank" href="https://vk.com/topic-223968138_49742783" className={styles.link}>
                  Оставить отзыв
                </a>
              </div>
              <div className={styles.support}>
                <div className={styles.text}>Поддержка</div>
                <a className={styles.linkSupport} href="mailto:info@anyboost.ru">Написать</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabWrapper}>
        <MemberCabinetTabs user={user} />
      </div>
    </div>
  );
};

export default page;

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./booster.module.scss";
import BoosterCabinetTabs from "@/components/BoosterCabinetTabs/BoosterCabinetTabs";
import { useGetMeQuery } from "@/store/services/userApi";
import { socket } from "@/lib/socket";

const BoosterPage = () => {
  const [isNewOrder, setIsNewOrder] = useState(false);
  const [newMessage, setNewMessage] = useState<Record<any, any> | null>();
  const { data: user } = useGetMeQuery();

  const messageAudioRef = useRef<HTMLAudioElement>(null);
  const newOrderAudioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const playMessageSound = () => {
    if (messageAudioRef.current) {
      messageAudioRef.current.play();
    }
  };

  const playNewOrderSound = () => {
    if (newOrderAudioRef.current) {
      newOrderAudioRef.current.play();
    }
  };

  useEffect(() => {
    const onNewMessage = (data) => {
      if (user && (data.chat.user1Id === user.id || data.chat.user2Id === user.id)) {
        clearTimeout(timeoutRef.current);
        playMessageSound();

        setNewMessage(data);
        const timeout = setTimeout(() => {
          setNewMessage(null);
        }, 5000);

        timeoutRef.current = timeout;
      }
    };

    socket.on("newMessage", onNewMessage);

    const onNewOrder = (data) => {
      playNewOrderSound();
      setIsNewOrder(true);
      setTimeout(() => {
        setIsNewOrder(false);
      }, 5000);
    };

    socket.on("newOrder", onNewOrder);

    return () => {
      socket.off("newOrder", onNewOrder);
      socket.off("newMessage", onNewMessage);
    };
  }, [user]);

  return (
    <div className={styles.member}>
      <div className="container">
        {isNewOrder && (
          <div className={styles.newOrder}>
            Появился новый заказ
          </div>
        )}
        {newMessage && (
          <div className={styles.newOrder}>
            <div>Новое сообщение в заказе {newMessage.chat.orderId}:</div>
            <div className={styles.newText}>{newMessage.text}</div>
          </div>
        )}
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
      <audio ref={messageAudioRef} src='/sound/mixkit-correct-answer-tone-2870.wav' />
      <audio ref={newOrderAudioRef} src='/sound/chinazes.wav' />
    </div>
  );
};

export default BoosterPage;

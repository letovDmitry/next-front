"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./member.module.scss";
import MemberCabinetTabs from "@/components/MemberCabinetTabs/MemberCabinetTabs";
import { useGetMeQuery } from "@/store/services/userApi";
import { socket } from "@/lib/socket";

const MemberPage = () => {
  const [newMessage, setNewMessage] = useState(null)
  const { data: user } = useGetMeQuery();
  const audioRef = useRef<HTMLAudioElement>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  useEffect(() => {
    const onNewMessage = (data) => {
      if (user && (data.chat.user1Id === user.id || data.chat.user2Id === user.id)) {
        clearTimeout(timeoutRef.current)
        play();

        setNewMessage(data)
        const timeout = setTimeout(() => {
          setNewMessage(null)
        }, 5000);

        timeoutRef.current = timeout
      }
    };
    
    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [user]);
  
  return (
    <div className={styles.member}>
      <div className="container">
        { newMessage && <div className={styles.newOrder}>
          <div>Новое сообщение в заказе {newMessage.chat.orderId}:</div>
          <div className={styles.newText}>{newMessage.text}</div>
        </div> }
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
                <a className={styles.linkSupport} href="mailto:info@anyboost.net">Написать</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabWrapper}>
        <MemberCabinetTabs user={user} />
      </div>
      <audio ref={audioRef} src='/sound/mixkit-correct-answer-tone-2870.wav' />
    </div>
  );
};

export default MemberPage;

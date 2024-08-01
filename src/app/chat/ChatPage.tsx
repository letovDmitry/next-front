"use client"

import React, { useEffect, useState, useRef } from "react";
import styles from "./chat.module.scss";
import { socket } from "@/lib/socket";
import { useGetMessagesByOrderIdQuery } from "@/store/services/chatApi";
import { useGetMeQuery } from "@/store/services/userApi";
import { io } from "socket.io-client";

const ChatPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: messages, refetch } = useGetMessagesByOrderIdQuery(
    searchParams.orderId as string
  );
  const { data: user } = useGetMeQuery();

  useEffect(() => {
    refetch()
    const socket1 = io("https://anyboost.ru", {
      query: {
        chatId: searchParams.orderId,
      },
      path: '/api/socket.io'
    });

    const onMessage = (data) => {
      refetch();
    };

    socket1.on("message", onMessage);

    return () => {
      socket1.off("message", onMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (text.trim().length === 0) {
      setText("");
      return;
    }
    socket.emit("message", {
      senderId: user?.id,
      orderId: searchParams.orderId,
      text,
    });
    setText("");
  };

  const getDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleString("ru", {
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }) +
      ` в ${
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
      }:${
        date.getMinutes() < 10
          ? `0${date.getMinutes()}`
          : `${date.getMinutes()}`
      }`
    );
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Сбрасываем высоту
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту в зависимости от содержимого
    }
  };

  return (
    <div className={styles.chat}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.orderNumber}>
              Чат по заказу {searchParams.orderId},
            </div>
            <div className={styles.name}>
              {searchParams.userEmail}, {searchParams.boosterEmail}
            </div>
          </div>
          <div className={styles.chatBody}>
            {messages?.length > 0 &&
              [...messages].reverse().map((m) =>
                m.senderId === user?.id ? (
                  <div className={styles.sentMessage}>
                    <div className={styles.sentText}>{m.text}</div>
                    <div className={styles.date}>{getDate(m.createdAt)}</div>
                  </div>
                ) : (
                  <div className={styles.incomingMessage}>
                    <div className={styles.incomingText}>{m.text}</div>
                    <div className={styles.date}>{getDate(m.createdAt)}</div>
                  </div>
                )
              )}
          </div>
          <div className={styles.chatActions}>
            <textarea
              ref={textareaRef}
              className={styles.textArea}
              value={text}
              onChange={handleTextChange}
              placeholder="Введите текст сообщения"
            ></textarea>
            <button onClick={handleSendMessage} className={styles.sendBtn}>
              <img src="./inputs/arrow-up.svg" alt="" />
            </button>
          </div>
          <div className={styles.attention}>
            Не переходите в другие мессенджеры, в ином случае мы не сможем
            помочь вам в решении проблем, если таковые возникнут
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

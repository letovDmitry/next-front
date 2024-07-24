'use client'

import ChatPage from "./ChatPage";
import type { Metadata } from "next";
import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Чат",
  description: "Чат на сайте anyboost.ru",
};

const ChatPageWrapper = () => {
  const searchParams = useSearchParams();
  const searchParamsObject: { [key: string]: string | string[] | undefined } = {};
  searchParams.forEach((value, key) => {
    searchParamsObject[key] = value;
  });

  return (
    <ChatPage searchParams={searchParamsObject} />
  );
};

export default ChatPageWrapper;

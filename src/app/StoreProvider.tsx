"use client";
import { setupStore } from "@/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof setupStore>>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

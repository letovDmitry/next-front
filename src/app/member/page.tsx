import MemberPage from "./MemberPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Личный кабинет на сайте anyboost.ru",
};

const Page = () => {
  return (
    <MemberPage />
  );
};

export default Page;

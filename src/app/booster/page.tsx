import BoosterPage from "./BoosterPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Личный кабинет",
    description: "Личный кабинет на сайте anyboost.ru",
  };


const page = () => {
  return (
    <BoosterPage/>
  );
};

export default page;

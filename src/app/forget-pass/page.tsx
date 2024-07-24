import ForgetPassPage from "./ForgetPassPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Восстановление пароля",
    description: "Регистрация на сайте anyboost.ru",
  };

const Page = () => {
  
  return (
    <ForgetPassPage/>
  );
};

export default Page;

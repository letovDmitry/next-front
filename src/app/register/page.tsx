import RegisterPage from "./RegisterPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Регистрация на сайте anyboost.ru",
  };

const page = () => {
  return (
    <RegisterPage />
  );
};

export default page;

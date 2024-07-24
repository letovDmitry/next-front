import LoginPage from "./LoginPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Вход в систему",
    description: "Вход в систему на сайте anyboost.ru",
  };

const Login = () => {
return (
    <LoginPage />
  );
};

export default Login;

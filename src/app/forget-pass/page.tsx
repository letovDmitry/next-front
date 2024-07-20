"use client";

import React, { useState } from "react";
import styles from "./forget.module.scss";
import { useRecoverPasswordMutation, useSignUpMutation } from "@/store/services/authApi";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isPhoneOrEmailFocused, setPhoneOrEmailFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const [recoverPassword] = useRecoverPasswordMutation();

  const handleSignUp = () => {
    recoverPassword({ email: phoneOrEmail })
      .unwrap()
      .then((r) => {
        router.push("/register-success");
      })
      .catch((e) => setIsError(true));
  };

  const clearPhoneOrEmail = () => {
    setPhoneOrEmail("");
  };

  return (
    <div className={styles.register}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.welcome}>Чтобы получить пароль,</div>
            <div className={styles.text}>
              Укажи свою почту
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            className={styles.form}
          >
            <div className={styles.inputWrapper}>
              <label
                className={`${styles.label} ${isError ? styles.errorTxt : ""} ${
                  isPhoneOrEmailFocused || phoneOrEmail ? styles.active : ""
                }`}
              >
                {isError ? "Такого пользователя не существует" : "Почта"}
              </label>
              <input
                className={`${styles.input} ${isError ? styles.error : ""}`}
                type="text"
                value={phoneOrEmail}
                onChange={(e) => {
                  setPhoneOrEmail(e.target.value);
                  setIsError(false);
                }}
                onFocus={() => setPhoneOrEmailFocused(true)}
                onBlur={() => setPhoneOrEmailFocused(false)}
              />
              {phoneOrEmail && (
                <img
                  src="/inputs/clear.svg"
                  className={styles.clearIcon}
                  onClick={clearPhoneOrEmail}
                  alt="clear input"
                />
              )}
            </div>
            <button className={styles.btn}>Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

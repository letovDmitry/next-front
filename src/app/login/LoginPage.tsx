
'use client'

import React, { useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import { useSignInMutation } from "@/store/services/authApi";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPhoneOrEmailFocused, setPhoneOrEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState("");
  
    const [signIn] = useSignInMutation();
    const router = useRouter();
  
    const handleSignIn = () => {
      if (!phoneOrEmail || !password) {
        setIsError("Заполните обязательные поля");
        return;
      }
  
      signIn({ email: phoneOrEmail, password })
        .unwrap()
        .then((r) => {
          if (r?.isBooster) {
            router.push("/booster");
            window.location.reload();
          } else {
            router.push("/member");
            window.location.reload();
          }
        })
        .catch(() => setIsError("Неверная почта или пароль"));
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };
  
    const clearPhoneOrEmail = () => {
      setPhoneOrEmail("");
    };
  
    return (
      <div className={styles.login}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.heading}>
              <div className={styles.welcome}>Добро пожаловать,</div>
              <div className={styles.text}>Войди в свой аккаунт</div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
              className={styles.form}
            >
              <div className={styles.inputWrapper}>
                <label
                  className={`${styles.label} ${isError ? styles.errorTxt : ""} ${
                    isPhoneOrEmailFocused || phoneOrEmail ? styles.active : ""
                  }`}
                >
                  {isError ? isError : `Почта`}
                </label>
                <input
                  className={`${styles.input} ${isError ? styles.error : ""}`}
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => {
                    setPhoneOrEmail(e.target.value);
                    setIsError("");
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
              <div className={styles.inputWrapper}>
                <label
                  className={`${styles.label} ${isError ? styles.errorTxt : ""} ${
                    isPasswordFocused || password ? styles.active : ""
                  }`}
                >
                  {isError ? '' : `Пароль`}
                </label>
                <input
                  className={`${styles.input} ${isError ? styles.error : ""}`}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsError("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <img
                  src={`/inputs/${showPassword ? "visibility_off" : "visibility"}.svg`}
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}
                  alt="toggle visibility"
                />
              </div>
              <Link href='/forget-pass' className={styles.forget}>Забыли пароль?</Link>
              <button className={styles.btn}>Войти</button>
              <div className={styles.info}>
                <div className={styles.account}>Нет аккаунта?</div>
                <Link href="/register" className={styles.register}>
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
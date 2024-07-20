"use client";

import React, { useState } from "react";
import styles from "./register.module.scss";
import { useSignUpMutation } from "@/store/services/authApi";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isPhoneOrEmailFocused, setPhoneOrEmailFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isBooster, setIsBooster] = useState(false);

  const [signUp] = useSignUpMutation();

  const handleSignUp = () => {
    signUp({ email: phoneOrEmail, isBooster })
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
            <div className={styles.welcome}>Добро пожаловать,</div>
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
                {isError ? "Неверная почта" : "Почта"}
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
            <div className={styles.switches}>
              <div className={styles.switchBody}>
                <div className={styles.column}>
                  <label className={styles.switchLabel}>
                    <input
                      checked={!isBooster}
                      onChange={(e) =>
                        e.target.checked
                          ? setIsBooster(false)
                          : setIsBooster(true)
                      }
                      className={styles.switch}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                    <span className={styles.switchTitle}>Участник</span>
                  </label>
                  <label className={styles.switchLabel}>
                    <input
                      checked={isBooster}
                      onChange={(e) =>
                        e.target.checked
                          ? setIsBooster(true)
                          : setIsBooster(false)
                      }
                      className={styles.switch}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                    <span className={styles.switchTitle}>Бустер</span>
                  </label>
                </div>
              </div>
            </div>
            <button className={styles.btn}>Продолжить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

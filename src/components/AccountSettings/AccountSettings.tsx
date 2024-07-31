"use client";
import React, { useState, useEffect } from "react";
import styles from "./settings.module.scss";
import DeleteAccPopUp from "../DeleteAccPopUp/DeleteAccPopUp";
import {
  IUser,
  useChangePasswordMutation,
  useChangeUserMutation,
} from "@/store/services/userApi";
import { toast, Toaster } from "react-hot-toast";

interface IProps {
  user: IUser | undefined;
}

const AccountSettings = ({ user }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isPassword2Focused, setPassword2Focused] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordMismatchError, setIsPasswordMismatchError] = useState(false);

  const [changeUser] = useChangeUserMutation();
  const [changePassword] = useChangePasswordMutation();


  useEffect(() => {
    if (user?.email) setEmail(user.email as string);
  }, [user]);

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevState) => !prevState);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordMismatchError("");
    setIsPasswordError(false);
    setIsPasswordMismatchError(false);

    if (password.length === 0 || password2.length === 0) {
      setPasswordError("Новый пароль не задан");
      setIsPasswordError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError("Минимум 8 символов");
      setIsPasswordError(true);
      return;
    }
    if (password !== password2) {
      setPasswordMismatchError("Введенные пароли не совпадают");
      setIsPasswordMismatchError(true);
      return;
    }
    changePassword({ newPassword: password })
      .then((_) => {
        toast.success("Пароль успешно изменен", {
          style: {
            border: '1px solid black',
          },
        });
        setPassword("");
        setPassword2("");
      })
      .catch((error) => {
        toast.error("Произошла ошибка при изменении пароля");
      });
  };

  return (
    <div className={`${styles.settings} ${isModalVisible ? styles.blurred : ""}`}>
      <Toaster position="top-center" />
      <div className="container">
        <div className={styles.content}>
          <form className={styles.form}>
            <div className={styles.inputWrapper}>
              <label className={`${styles.label} ${isEmailFocused || email ? styles.active : ""}`}>
                Почта
              </label>
              <input
                className={styles.input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              {email && (
                <img
                  src="/inputs/edit.svg"
                  className={styles.clearIcon}
                  onClick={() => changeUser({ email })}
                  alt="clear input"
                />
              )}
            </div>
          </form>
          <form className={styles.form}>
            <div className={styles.inputWrapper}>
              <label className={`${styles.label} ${isPasswordFocused || password ? styles.active : ""} ${isPasswordError ? styles.errorTxt : ""}`}>
                {isPasswordError ? passwordError : "Новый Пароль"}
              </label>
              <input
                className={`${styles.input} ${isPasswordError ? styles.error : ""}`}
                type={showPassword1 ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordError(false);
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <img
                src={`/inputs/${showPassword1 ? "visibility_off" : "visibility"}.svg`}
                className={styles.eyeIcon}
                onClick={togglePasswordVisibility1}
                alt="toggle visibility"
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={`${styles.label} ${isPassword2Focused || password2 ? styles.active : ""} ${isPasswordMismatchError ? styles.errorTxt : ""}`}>
                {isPasswordMismatchError ? passwordMismatchError : "Подтверди новый Пароль"}
              </label>
              <input
                className={`${styles.input} ${isPasswordMismatchError ? styles.error : ""}`}
                type={showPassword2 ? "text" : "password"}
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  setIsPasswordMismatchError(false);
                }}
                onFocus={() => setPassword2Focused(true)}
                onBlur={() => setPassword2Focused(false)}
              />
              <img
                src={`/inputs/${showPassword2 ? "visibility_off" : "visibility"}.svg`}
                className={styles.eyeIcon}
                onClick={togglePasswordVisibility2}
                alt="toggle visibility"
              />
            </div>
          </form>
        </div>
        <div className={styles.formBtns}>
          <button className={styles.btn} type="button" onClick={toggleModal}>
            Удалить аккаунт
          </button>
          <button onClick={handleChangePassword} className={styles.changeBtn}>
            Сменить Пароль
          </button>
        </div>
      </div>

      {isModalVisible && <DeleteAccPopUp onClose={toggleModal} />}
    </div>
  );
};

export default AccountSettings;

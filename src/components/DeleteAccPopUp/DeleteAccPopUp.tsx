import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./deleteacc.module.scss";
import { useDeleteUserMutation } from "@/store/services/userApi";

const DeleteAccPopUp = ({ onClose }) => {
  const [deleteAcc, setDeleteAcc] = useState("");
  const [isDeleteAccFocused, setDeleteAccFocused] = useState(false);

  const [deleteUser] = useDeleteUserMutation();

  const clearDeleteAcc = () => {
    setDeleteAcc("");
  };

  const handleDeleteClick = () => {
    if (deleteAcc === "Подтверждаю") {
      deleteUser();
    } else {
      toast.error("Неправильный ввод. Пожалуйста, введите «Подтверждаю».");
    }
  };

  return (
    <div className={styles.DeleteAccPopUpOverlay}>
      <Toaster position="bottom-center"/>
      <div className="container">
        <div className={styles.modal}>
          <div className={styles.heading}>
            <div className={styles.headingWrapper}>
              <div className={styles.write}>Напиши</div>
              <div className={styles.aproove}>«Подтверждаю»</div>
            </div>
            <div className={styles.text}>Чтобы удалить аккаунт</div>
          </div>
          <div className={styles.inputWrapper}>
            <label
              className={`${styles.label} ${
                isDeleteAccFocused || deleteAcc ? styles.active : ""
              }`}
            >
              Подтверди удаление аккаунта
            </label>
            <input
              className={styles.input}
              type="text"
              value={deleteAcc}
              onChange={(e) => setDeleteAcc(e.target.value)}
              onFocus={() => setDeleteAccFocused(true)}
              onBlur={() => setDeleteAccFocused(false)}
            />
            {deleteAcc && (
              <img
                src="/inputs/clear.svg"
                className={styles.clearIcon}
                onClick={clearDeleteAcc}
                alt="clear input"
              />
            )}
          </div>
          <div className={styles.modalActions}>
            <button
              className={styles.modalBtnDelete}
              onClick={handleDeleteClick}
            >
              Удалить аккаунт
            </button>
            <button className={styles.modalBtn} onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccPopUp;

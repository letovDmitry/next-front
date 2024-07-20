"use client";

import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/store/services/ordersApi";
import { useGetMeQuery } from "@/store/services/userApi";
import Link from "next/link";

const Checkout = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: user } = useGetMeQuery();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [comment, setComment] = useState("");
  const [promocode, setPromocode] = useState("");
  const [password, setPassword] = useState("");
  const [isPhoneFocused, setPhoneFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isCommentFocused, setCommentFocused] = useState(false);
  const [isPromocodeFocused, setPromocodeFocused] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("");

  console.log(searchParams);

  useEffect(() => {
    if (user?.email) setPhone(user.email as string);
  }, [user]);

  const router = useRouter();

  const { system, type, current, goal, price, options } = searchParams;

  const [createOrder] = useCreateOrderMutation();

  const clearInput = (setFunction) => {
    setFunction("");
  };

  const handlePaymentMethodClick = (method) => {
    setActivePaymentMethod(method);
  };

  const handleFocus = (setFocusFunction) => {
    setFocusFunction(true);
  };
  
  const handleBlur = (setFocusFunction) => {
    setFocusFunction(false);
  };
  

  return (
    <>
      <div className={styles.checkout}>
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.heading}>
              <div className={styles.good}>Отлично,</div>
              <div className={styles.text}>Осталось только оплатить</div>
            </div>
            <div className={styles.body}>
              <div className={styles.contacts}>
                <div className={styles.title}>Контактная информация</div>
                <div className={styles.inputs}>
                  <form className={styles.form}>
                    <div className={styles.inputWrapper}>
                      <label
                        className={`${styles.label} ${isLoginFocused || login ? styles.active : ""}`}
                      >
                        Ваше Имя
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        onFocus={() => handleFocus(setLoginFocused)}
                        onBlur={() => handleBlur(setLoginFocused)}
                      />
                      {login && (
                        <img
                          src="/inputs/clear.svg"
                          className={styles.clearIcon}
                          onClick={() => clearInput(setLogin)}
                          alt="clear input"
                        />
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label
                        className={`${styles.label} ${isPhoneFocused || phone ? styles.active : ""}`}
                      >
                        Почта
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => handleFocus(setPhoneFocused)}
                        onBlur={() => handleBlur(setPhoneFocused)}
                      />
                      {phone && (
                        <img
                          src="/inputs/clear.svg"
                          className={styles.clearIcon}
                          onClick={() => clearInput(setPhone)}
                          alt="clear input"
                        />
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label
                        className={`${styles.label} ${isEmailFocused || email ? styles.active : ""}`}
                      >
                        Контакт (telegram, discord, vk)
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus(setEmailFocused)}
                        onBlur={() => handleBlur(setEmailFocused)}
                      />
                      {email && (
                        <img
                          src="/inputs/clear.svg"
                          className={styles.clearIcon}
                          onClick={() => clearInput(setEmail)}
                          alt="clear input"
                        />
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label
                        className={`${styles.label} ${isCommentFocused || comment ? styles.active : ""}`}
                      >
                        Комментарий к заказу
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => handleFocus(setCommentFocused)}
                        onBlur={() => handleBlur(setCommentFocused)}
                      />
                      {comment && (
                        <img
                          src="/inputs/clear.svg"
                          className={styles.clearIcon}
                          onClick={() => clearInput(setComment)}
                          alt="clear input"
                        />
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <label
                        className={`${styles.label} ${isPromocodeFocused || promocode ? styles.active : ""}`}
                      >
                        Промокод
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        value={promocode}
                        onChange={(e) => setPromocode(e.target.value)}
                        onFocus={() => handleFocus(setPromocodeFocused)}
                        onBlur={() => handleBlur(setPromocodeFocused)}
                      />
                      {promocode && (
                        <img
                          src="/inputs/clear.svg"
                          className={styles.clearIcon}
                          onClick={() => clearInput(setPromocode)}
                          alt="clear input"
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className={styles.payment}>
                <div className={styles.title}>Платежная система</div>
                <div className={styles.methods}>
                  <div className={styles.types}>
                    <button
                      className={`${styles.item} ${activePaymentMethod === "enot" ? styles.activePayment : ""}`}
                      onClick={() => handlePaymentMethodClick("enot")}
                    >
                      <div className={styles.logoEnot}>
                        <img src="./checkout/enot.svg" alt="" />
                      </div>
                      <div className={styles.cards}>
                        <img src="./checkout/visa.svg" alt="" />
                        <img className={styles.mc} src="./checkout/mc.svg" alt="" />
                        <img src="./checkout/mir.svg" alt="" />
                      </div>
                    </button>
                    <button
                      className={`${styles.item} ${activePaymentMethod === "lava" ? styles.activePayment : ""}`}
                      onClick={() => handlePaymentMethodClick("lava")}
                    >
                      <div className={styles.logoLava}>
                        <img src="./checkout/lava.svg" alt="" />
                      </div>
                      <div className={styles.cards}>
                        <img src="./checkout/visa.svg" alt="" />
                        <img className={styles.mc} src="./checkout/mc.svg" alt="" />
                        <img src="./checkout/mir.svg" alt="" />
                      </div>
                    </button>
                  </div>
                </div>
                <div className={styles.pay}>
                  <div className={styles.totalTitle}>Итого к оплате</div>
                  <div className={styles.totalOptions}>
                    {system} {type} от {current} до {goal}
                  </div>
                  <div className={styles.totalPrice}>{price}₽</div>
                  <Link href='/payment-success'
                    onClick={() => {
                      console.log(phone);
                      createOrder({
                        status: "success",
                        custom_fields: {
                          system,
                          goal: goal as string,
                          current: current as string,
                          type: type as string,
                          options: options as string,
                          email: phone,
                        },
                      })
                        .unwrap()
                        .then((_) => {
                          router.push("/payment-success");
                        });
                    }}
                    className={styles.totalBtn}
                  >
                    Оплатить
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default Checkout;

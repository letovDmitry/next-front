"use client";

import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useRouter } from "next/navigation";
import { useCreateOrderEnotMutation } from "@/store/services/ordersApi";
import { useGetMeQuery } from "@/store/services/userApi";
import Link from "next/link";
import { Toaster, toast } from 'react-hot-toast';

const CheckoutPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: user } = useGetMeQuery();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [promocode, setPromocode] = useState("");
  const [isPhoneFocused, setPhoneFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isPromocodeFocused, setPromocodeFocused] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("");

  console.log(searchParams);

  useEffect(() => {
    if (user?.email) setPhone(user.email as string);
  }, [user]);

  const router = useRouter();

  const { system, type, current, goal, price, options } = searchParams;

  const [createOrder] = useCreateOrderEnotMutation();

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

  const handlePayment = (e) => {
    e.preventDefault();
    if (!activePaymentMethod) {
      toast.error('Выберите Платежную систему');
      return;
    }
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
  };

  return (
    <>
    <Toaster />
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
                      className={`${styles.item} ${activePaymentMethod === "selfwork" ? styles.activePayment : ""}`}
                      onClick={() => handlePaymentMethodClick("selfwork")}
                    >
                      <div className={styles.logoLava}>
                        <svg width="46" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m62.65 24.614 1.26 2.429c-1.576 1.539-3.878 2.093-6.023 2.114-2.616.026-5.109-.829-7.025-2.643a9.542 9.542 0 0 1-2.689-7.014c-.085-2.555.546-4.862 2.56-6.929 1.88-1.926 4.4-2.811 7.068-2.728 2.353.073 4.124.566 5.722 1.9l-1.43 2.428c-1.272-.84-2.546-1.284-4.292-1.257-.95.015-1.637.12-2.396.43-2.42.988-3.867 3.58-3.727 6.156-.178 3.65 2.833 6.63 6.495 6.614 1.844-.008 3.188-.527 4.477-1.5zM67.242 20l-.772-2.257c1.299-.766 2.557-1.144 4.291-1.143.776 0 1.339.02 1.974.23a4.88 4.88 0 0 1 1.717.998 5.31 5.31 0 0 1 1.16 3.772v7.257h-2.647v-1.429a4.063 4.063 0 0 1-1.59 1.236c-1.016.442-2.423.478-3.47.094a3.777 3.777 0 0 1-1.278-.787A4.04 4.04 0 0 1 66.8 22.4a4.782 4.782 0 0 1 3.204-1.014 4.639 4.639 0 0 1 2.733.771 3.824 3.824 0 0 0-.472-2.357 2.047 2.047 0 0 0-1.789-.743 7.604 7.604 0 0 0-3.233.943zm5.436 5.4V24.17a3.35 3.35 0 0 0-2.131-.585c-.896-.062-2.016.472-1.974 1.5-.022.395.178.779.486 1.028 1.105.844 2.845.342 3.62-.714zm6.037 3.528h3.09V21.5l3.677 4.5h.086l3.576-4.5v7.357h3.09V16.814h-2.718l-3.891 5.043-4.077-5.043h-2.79l-.043 12.114zM96.726 27.5a6.609 6.609 0 0 1 0-9.072 7.259 7.259 0 0 1 9.542 0 6.06 6.06 0 0 1 1.874 4.429 6.174 6.174 0 0 1-1.831 4.543 7.303 7.303 0 0 1-4.771 1.774c-1.752 0-3.489-.53-4.814-1.674zm1.545-4.643c-.062 1.83 1.41 3.515 3.29 3.457 1.894.063 3.372-1.61 3.305-3.457.066-1.812-1.439-3.486-3.305-3.429-1.858-.037-3.36 1.617-3.29 3.429zm13.748 5.714c.988.37 2.106.6 3.161.6a7.23 7.23 0 0 0 3.991-.971 3.044 3.044 0 0 0 1.503-2.672 2.681 2.681 0 0 0-.673-1.828 3.277 3.277 0 0 0-1.888-1 3.448 3.448 0 0 0 1.645-1.072 2.5 2.5 0 0 0 .587-1.6A2.856 2.856 0 0 0 119.1 17.5c-1.075-.664-2.146-.852-3.591-.9-1.126-.038-1.948.037-2.86.378a6.412 6.412 0 0 0-2.404 1.593l1.287 1.843a5.14 5.14 0 0 1 3.319-1.428c1.431 0 2.117.442 2.117 1.314.01.195-.024.39-.1.571a1.532 1.532 0 0 1-1.516.9h-2.117v2.086h2.26c.477-.031.951.1 1.345.371.152.112.275.26.357.429a1.224 1.224 0 0 1-.515 1.629 3.45 3.45 0 0 1-1.831.4 4.741 4.741 0 0 1-1.888-.429 4.181 4.181 0 0 1-1.531-1.043l-1.588 1.929a5.079 5.079 0 0 0 2.175 1.428zM124.465 20l-.773-2.257c1.3-.764 2.557-1.147 4.292-1.143.773.001 1.333.021 1.966.232.632.212 1.215.55 1.71.996a5.305 5.305 0 0 1 1.159 3.772v7.257h-2.632v-1.429a4.068 4.068 0 0 1-1.589 1.236c-1.017.443-2.423.478-3.471.093a3.801 3.801 0 0 1-1.278-.786 4.043 4.043 0 0 1 .172-5.571c.91-.715 1.892-1.025 3.205-1.014 1.114.009 1.933.235 2.746.771a4.036 4.036 0 0 0-.472-2.357 2.06 2.06 0 0 0-1.788-.743 7.599 7.599 0 0 0-3.247.943zm5.436 5.4V24.17a3.34 3.34 0 0 0-2.118-.585c-.907-.06-1.989.474-1.974 1.5.007.409.166.769.487 1.028 1.109.833 2.833.35 3.605-.714zm14.434 3.528h3.104V16.814h-3.104v4.614h-5.293v-4.614h-3.09v12.043h3.09v-4.571h5.293v4.642zm12.46-12.042h3.948v11.971h-3.09v-3.6h-1.716l-2.504 3.6h-3.548l3.234-4.286c-1.67-.603-2.574-2.39-2.297-4.111a3.968 3.968 0 0 1 1.481-2.503c1.336-.866 2.912-1.071 4.492-1.071zm-2.704 4.414c.003 1.034 1.06 1.705 2.017 1.657h1.617V19.5h-1.431c-1.079-.059-2.214.648-2.203 1.814V21.3zm8.841-1.414h3.991v8.971h3.09V19.9h3.949v-3.086h-11.016l-.014 3.072zm17.596 8.957h-4.363V16.814h3.09v3.3h1.516c1.466 0 2.853.282 4.02 1.114a3.87 3.87 0 0 1 1.302 3.058 4.244 4.244 0 0 1-1.431 3.314c-1.181.923-2.505 1.243-4.134 1.243zm-.029-6.272h-1.244v3.615h1.216c1.559 0 2.346-.6 2.346-1.786s-.773-1.829-2.318-1.829zm10.401 6.3h-3.09V16.814h3.09v12.057zm13.847-1.128-.901-2.257a5.327 5.327 0 0 1-3.419 1.1c-1.713.067-3.434-1.025-3.634-2.815h8.741c.145-.54.208-1.098.186-1.657a5.392 5.392 0 0 0-1.659-4.014c-1.714-1.627-4.403-2.008-6.581-1.158a6.147 6.147 0 0 0-3.461 3.482c-.584 1.511-.599 3.396-.007 4.908.634 1.62 1.939 2.837 3.566 3.438 2.307.851 5.224.46 7.169-1.027zm-8.039-6.029a2.878 2.878 0 0 1 1.027-1.974c1.116-.923 3.086-.88 4.166.088.503.486.78 1.188.743 1.886h-5.936z" fill="#fff"/><path d="M34.154 6.471a19.053 19.053 0 0 0-5.565-4.286 19.392 19.392 0 0 0-18.67.728 19.356 19.356 0 0 0-6.763 6.87A19.323 19.323 0 0 0 .55 19.056 19.394 19.394 0 0 0 3.282 29.36a19.43 19.43 0 0 0 7.768 7.31 19.737 19.737 0 0 0 12.517 1.9 18.063 18.063 0 0 0 9.084-4.428 1.427 1.427 0 0 0 0-1.9 1.345 1.345 0 0 0-1.83-.1 16.578 16.578 0 0 1-19.454 1.594 16.549 16.549 0 0 1-6.673-7.788A16.521 16.521 0 0 1 9.28 7.003 16.578 16.578 0 0 1 28.747 5.57a16.548 16.548 0 0 1 6.608 7.844A16.82 16.82 0 0 1 35.985 24a2.986 2.986 0 0 1-2.861 2.119 2.992 2.992 0 0 1-2.862-2.12 15.764 15.764 0 0 1-.386-4.4 8.773 8.773 0 0 0-.472-3.242 2.772 2.772 0 0 0-1.044-1.214 2.864 2.864 0 0 0-1.545-.443c-.544-.001-1.077.158-1.53.457-.461.295-.832.71-1.074 1.2-.443.928-.772 2.671-1.187 3.857-.415 1.186-.5 1.9-.901 3.014-.573 1.629-.93 3.2-1.302 3.843-.215.372-.444.372-.601.314a.471.471 0 0 1-.186-.242.485.485 0 0 1-.072-.243v-6.057a38.228 38.228 0 0 0-.214-6.557 2.27 2.27 0 0 0-1.898-1.914 2.277 2.277 0 0 0-2.394 1.242 57.462 57.462 0 0 0-3.161 5.557c-.387.729-.787 1.429-1.216 2.243-.43.814-.859.929-1.43.8a1.103 1.103 0 0 1-.745-.7 5.835 5.835 0 0 1 0-1.928c.096-1.182.35-2.345.758-3.458a10.771 10.771 0 0 1 3.448-5.043 1.173 1.173 0 0 1 1.788.686.844.844 0 0 0 1.145.429c.6-.343.915-1.272-.444-2.229a5.155 5.155 0 0 0-5.722-.1 11.613 11.613 0 0 0-4.292 6.457 12.156 12.156 0 0 0-.4 4.286c.2 2.529 1.273 4.086 2.69 4.286 2.06.271 3.805-1.972 4.29-2.672a36.667 36.667 0 0 0 1.918-3.3l.744-1.357c.243-.428.4-.743.415-.757.014-.014 0-.128.128-.114.13.014.1.1.1.128v.586c0 .586.2 2.586.487 5.943a10.089 10.089 0 0 0 1.087 4.628l.129.243c.219.373.535.68.915.886.375.215.799.328 1.23.329 2.046 0 2.747-2.258 3.134-3.043.557-1.1 1.845-6.229 2.503-7.843a.515.515 0 0 1 .973.1c0 .328.114.7.157 1.029.043.328.2 1.185.372 2.242.096.921.264 1.834.5 2.729a6.083 6.083 0 0 0 1.431 2.529 5.724 5.724 0 0 0 4.778 1.7 6.128 6.128 0 0 0 3.32-1.43 8.567 8.567 0 0 0 2.646-5.156 19.49 19.49 0 0 0-4.95-15.715" fill="#fff"/></svg>
                        <div>Самозанятые</div>
                      </div>
                      <div className={styles.cards}>
                        <img src="./checkout/visa.svg" alt="" />
                        <img className={styles.mc} src="./checkout/mc.svg" alt="" />
                        <img src="./checkout/mir.svg" alt="" />
                      </div>
                    </button>
                    <button
                      className={`${styles.item} ${activePaymentMethod === "morune" ? styles.activePayment : ""}`}
                      onClick={() => handlePaymentMethodClick("morune")}
                    >
                      <div className={styles.logoEnot}>
                        <img src="./morune.webp" alt="" />
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
                    onClick={handlePayment}
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

export default CheckoutPage;

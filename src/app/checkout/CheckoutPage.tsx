"use client";

import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useRouter } from "next/navigation";
import { useCreateOrderEnotMutation, useCreateOrderYookassaMutation } from "@/store/services/ordersApi";
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

  const [createOrderEnot] = useCreateOrderEnotMutation();
  const [createOrderYookassa] = useCreateOrderYookassaMutation();

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
    if (activePaymentMethod === 'enot') {
      createOrderEnot({
        status: "success",
        custom_fields: {
          system,
          goal: goal as string,
          current: current as string,
          type: type as string,
          options: options as string,
          email: phone,
          price
        },
      })
        .unwrap()
        .then((r) => {
          router.push(r.url);
        });
    } else {
      createOrderYookassa({
        status: "success",
        custom_fields: {
          system,
          goal: goal as string,
          current: current as string,
          type: type as string,
          options: options as string,
          email: phone,
          price
        },
      })
        .unwrap()
        .then((r) => {
          router.push(r.confirmation_url);
        });
    }
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
                        <svg width="126" height="38" viewBox="0 0 116 28"><path d="M59.5605 8.52763H55.7453L53.0455 13.2757H51.6558L51.6115 3H48V21.5583H51.6115L51.6558 16.4647H53.0367L56.6217 21.5583H60.6227L55.9489 14.8082L59.5605 8.52763Z" fill="#fff"></path><path d="M86.8948 14.64C86.1611 14.1648 85.366 13.7922 84.5314 13.5327L83.7347 13.2315L83.519 13.1505C83.0243 12.9649 82.5043 12.7697 82.4866 12.2659C82.482 12.1163 82.5152 11.968 82.5834 11.8348C82.6515 11.7016 82.7522 11.5878 82.8761 11.5041C83.1377 11.3237 83.4441 11.2194 83.7613 11.2029C84.4529 11.1551 85.1384 11.3597 85.691 11.7787L85.7884 11.8407L87.718 9.61726L87.6207 9.53754C87.3804 9.32321 87.1195 9.1333 86.8417 8.9706C86.344 8.68565 85.8027 8.4851 85.2395 8.37708C84.4284 8.20438 83.5899 8.20438 82.7787 8.37708C81.9945 8.48096 81.2504 8.78613 80.6189 9.26292C80.215 9.57917 79.8774 9.97195 79.6253 10.4188C79.3732 10.8657 79.2115 11.3579 79.1495 11.8673C79.0388 12.7866 79.2721 13.7143 79.8045 14.4717C80.5118 15.2554 81.4363 15.8105 82.4601 16.0662L82.6194 16.1193L82.9823 16.2433C84.2924 16.6862 84.6642 16.8634 84.8766 17.1292C84.9754 17.2629 85.031 17.4236 85.0359 17.5898C85.0359 18.2187 84.2658 18.4756 83.7436 18.6351C83.3784 18.7037 83.003 18.6967 82.6407 18.6144C82.2783 18.5321 81.9367 18.3764 81.6369 18.1567C81.1516 17.832 80.7363 17.4133 80.4153 16.9254C80.3618 16.9813 80.1843 17.1588 79.9524 17.3908C79.3012 18.042 78.2205 19.1228 78.2466 19.1489L78.3086 19.2375C79.2726 20.4452 80.6231 21.2836 82.1326 21.6115C82.4775 21.6783 82.8264 21.7226 83.1771 21.7444H83.54C84.7324 21.7694 85.9006 21.4056 86.8683 20.708C87.5228 20.2446 88.025 19.5972 88.3111 18.8477C88.4852 18.3446 88.5469 17.8094 88.4918 17.2798C88.4367 16.7502 88.2663 16.2392 87.9925 15.7827C87.7126 15.3275 87.3383 14.9378 86.8948 14.64Z" fill="#fff"></path><path d="M96.2074 13.5326C97.0392 13.7922 97.8314 14.1647 98.562 14.6399C98.9976 14.9377 99.3655 15.324 99.6419 15.7737C99.9157 16.2302 100.086 16.7413 100.141 17.2708C100.196 17.8004 100.135 18.3356 99.9606 18.8387C99.6744 19.5882 99.1722 20.2357 98.5177 20.699C97.55 21.3967 96.3818 21.7604 95.1894 21.7354H94.8265C94.4758 21.7142 94.1269 21.6698 93.782 21.6026C92.2725 21.2746 90.9221 20.4362 89.958 19.2285L89.8872 19.1399C89.8698 19.1167 90.7236 18.2597 91.3686 17.6122C91.7074 17.2721 91.9888 16.9897 92.0559 16.9165C92.3816 17.4005 92.7961 17.8183 93.2774 18.1478C93.5788 18.3677 93.922 18.5235 94.2858 18.6058C94.6496 18.688 95.0264 18.695 95.393 18.6261C95.9153 18.4667 96.6765 18.2098 96.6765 17.5808C96.6813 17.4145 96.6281 17.2516 96.5261 17.1202C96.3136 16.8545 95.9418 16.6773 94.6229 16.2344L94.26 16.1104L94.1095 16.0572C93.0857 15.8015 92.1612 15.2464 91.454 14.4627C90.9168 13.7076 90.683 12.778 90.7989 11.8583C90.8638 11.349 91.0285 10.8575 91.2837 10.4121C91.5389 9.96668 91.8795 9.57611 92.286 9.26283C92.9191 8.78881 93.6624 8.48395 94.4459 8.37699C95.26 8.20409 96.1014 8.20409 96.9155 8.37699C97.4758 8.48532 98.0142 8.68588 98.5089 8.97051C98.7908 9.13096 99.0549 9.32101 99.2967 9.53744L99.3852 9.61716L97.4555 11.8406L97.367 11.7786C96.8137 11.361 96.1287 11.1566 95.4373 11.2028C95.1201 11.2193 94.8136 11.3236 94.5521 11.504C94.4309 11.5911 94.3318 11.7053 94.2626 11.8376C94.1934 11.9699 94.1562 12.1165 94.1538 12.2658C94.1803 12.7707 94.6937 12.9656 95.1983 13.1517L95.4019 13.2314L96.2074 13.5326Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M71.4216 8.52758V9.80318H71.2623C70.2737 8.81262 68.9346 8.25237 67.5357 8.24411C66.6781 8.22715 65.8266 8.39113 65.0366 8.72539C64.2466 9.05964 63.5357 9.55666 62.9504 10.1841C61.77 11.507 61.137 13.23 61.1801 15.0031C61.1343 16.8059 61.766 18.5603 62.9504 19.9195C63.5218 20.5473 64.2215 21.0447 65.0019 21.3779C65.7824 21.7111 66.6254 21.8723 67.4737 21.8506C68.8743 21.8243 70.2213 21.307 71.28 20.389H71.4216V21.5317H75.1748V8.52758H71.4216ZM71.6075 15.0739C71.6452 16.1219 71.2953 17.1469 70.625 17.9529C70.3036 18.313 69.9071 18.598 69.4635 18.7878C69.0199 18.9777 68.5401 19.0676 68.0579 19.0513C67.5903 19.0592 67.1269 18.9613 66.7024 18.765C66.2778 18.5687 65.903 18.279 65.606 17.9175C64.9435 17.0948 64.6036 16.0586 64.65 15.0031C64.6199 13.9793 64.9664 12.98 65.6237 12.1949C65.9263 11.8389 66.3038 11.5542 66.7293 11.3613C67.1547 11.1683 67.6175 11.0719 68.0845 11.0788C68.5634 11.0639 69.0397 11.1554 69.479 11.3469C69.9183 11.5384 70.3097 11.825 70.625 12.1861C71.2952 12.9956 71.6448 14.0233 71.6075 15.0739Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M112.247 9.8033V8.5277H116V21.5318H112.247V20.3891H112.105C111.047 21.3071 109.7 21.8244 108.299 21.8507C107.451 21.8725 106.608 21.7113 105.827 21.378C105.047 21.0448 104.347 20.5474 103.776 19.9196C102.591 18.5604 101.959 16.806 102.005 15.0032C101.962 13.2301 102.595 11.5071 103.776 10.1842C104.363 9.55742 105.076 9.06093 105.867 8.72677C106.658 8.39262 107.511 8.22824 108.37 8.24423C109.766 8.25481 111.101 8.81488 112.087 9.8033H112.247ZM111.45 17.953C112.124 17.1491 112.475 16.1226 112.433 15.074C112.474 14.0228 112.124 12.9936 111.45 12.1862C111.135 11.8251 110.743 11.5385 110.304 11.347C109.865 11.1556 109.389 11.064 108.91 11.0789C108.443 11.072 107.98 11.1684 107.554 11.3614C107.129 11.5543 106.752 11.839 106.449 12.1951C105.792 12.9802 105.445 13.9794 105.475 15.0032C105.429 16.0587 105.769 17.0949 106.431 17.9176C106.728 18.2791 107.103 18.5688 107.528 18.7651C107.952 18.9614 108.416 19.0593 108.883 19.0515C109.365 19.0677 109.845 18.9778 110.289 18.788C110.732 18.5981 111.129 18.3131 111.45 17.953Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5313 13.9618C11.5521 6.27038 17.8505 0 25.7651 0C33.6028 0 40.0892 6.29114 39.9991 14C39.9991 21.7089 33.6028 28 25.7651 28C17.9403 28 11.5522 21.8178 11.5313 14.0384V24.4557H6.48634L0 4.07593H11.5313V13.9618ZM20.4499 14C20.4499 16.8354 22.8823 19.2279 25.7651 19.2279C28.7381 19.2279 31.0803 16.8354 31.0803 14C31.0803 11.1646 28.648 8.77215 25.7651 8.77215C22.8823 8.77215 20.4499 11.1646 20.4499 14Z" fill="#fff"></path></svg>
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

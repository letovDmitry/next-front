import styles from './register-success.module.scss';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Успешная Регистрация",
    description: "Успешная Регистрация на сайта anyboost.ru",
  };


const page = () => {
  return (
    <div className={styles.register}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.welcome}>Отлично,</div>
            <div className={styles.text}>Мы отправили тебе сообщение с паролем</div>
          </div>

            <Link href='/login' className={styles.btn}>Войти в аккаунт</Link>
  
        </div>
      </div>
    </div>
  );
};

export default page;
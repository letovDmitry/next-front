import React from 'react'
import styles from './payment.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Успешная Оплата",
    description: "Успешная Оплата на сайте anyboost.ru",
  };


const PaymentSuccess = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (Object.keys(searchParams).includes('error')) return (
    <div className={styles.notFound}>
        <div className='container'>
            <div className={styles.body}>
               <Image src="./error.svg" alt="" width={100} height={100} quality={100}/>
                <h1>Что-то пошло не так,</h1>
                <span>Проверьте введенные данные и повторите попытку еще раз</span> 
                <Link href='/'>Назад</Link>
            </div>
        </div>
    </div>
  )

  return (
    <div className={styles.notFound}>
        <div className='container'>
            <div className={styles.body}>
               <Image src="./success.svg" alt="" width={100} height={100} quality={100}/>
                <h1>Поздравляем,</h1>
                <span>Оплата прошла успешно.</span>
                <span className={styles.help}>Чтобы следить за статусом заказа перейдите в личный кабинет и выберети вкладку "Заказы" </span>
                <Link href='/member'>Перейти</Link>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess

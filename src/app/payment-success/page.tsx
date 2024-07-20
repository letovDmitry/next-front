import React from 'react'
import styles from './payment.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const PaymentSuccess = () => {
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

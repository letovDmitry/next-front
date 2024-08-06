import React from 'react'
import styles from './details.module.scss';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Реквизиты",
    description: "Юридическое соглашение пользователя для сайта anyboost.ru",
  };

const page = () => {
    
  return (
    <div className={styles.details}>
        <div className='container'>
               <div className={styles.wrap}>
                <h1 className={styles.title}>Реквизиты</h1>
                  <div className={styles.body}>
                  <div className={styles.item}>
                        <span className={styles.heading}>Самозанятый:</span>
                        Сертаков.Н.А
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading}>ИНН:</span>
                        910102619707
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading}>ФИО:</span>
                        Сертаков Н.А
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading}>Почта:</span>
                        info@anyboost.net
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading}>Телеграм:</span>
                        <a href='https://t.me/usyaoff'>@usyaoff</a>
                    </div>
                  </div>
               </div>
        </div>
    </div>
  )
}

export default page

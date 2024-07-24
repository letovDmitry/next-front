import React from 'react'
import styles from './not-found.module.scss';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ошибка 404",
    description: "Такой страницы не существует",
  };


const NotFound = () => {
  return (
    <div className={styles.notFound}>
        <div className='container'>
            <div className={styles.body}>
                <h1>Такой страницы не существует</h1>
                <span>404</span>
                <Link href='/'>Вернуться назад</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound

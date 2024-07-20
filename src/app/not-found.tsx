import React from 'react'
import styles from './not-found.module.scss';
import Link from 'next/link';

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

'use client'

import React from 'react'
import styles from './process.module.scss';
import BoostTabs from '../BoostTabs/BoostTabs';


const Process = () => {
  return (
    <section className={styles.process}>
        <div className={styles.wrapper}>
            <div className="container">
                <h3 className={styles.title}>Как выглядит процесс?</h3>
                <div className={styles.body}>
                    <div className={styles.item}>
                        <div className={styles.heading}>
                            <div className={styles.number}>1</div>
                        </div>
                        <div className={styles.text}>Выбери тип буста, укажи текущий и желаемый рейтинги</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.heading}>
                            <div className={styles.number}>2</div>
                        </div>
                        <div className={styles.text}>Выбери дополнительные опции и сделай заказ</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.heading}>
                            <div className={styles.number}>3</div>
                        </div>
                        <div className={styles.text}>В течение 10 минут с тобой свяжется твой бустер</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.sa}>
                            <div className={styles.number}>4</div>
                        </div>
                        <div className={styles.text}>В процессе поднятия твоего elo</div>
                    </div>
                </div>
            </div>
        </div>
        <BoostTabs />
    </section>
  )
}

export default Process

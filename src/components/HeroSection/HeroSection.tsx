import React from 'react';
import Image from 'next/image';
import DarkButton from '../DarkButton/DarkButton';
import RegularButton from '../RegularButton/RegularButton';
import styles from './herosection.module.scss'
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
        <div className="container">
            <div className={styles.body}>
                <div className={styles.content}>
                    <div className={styles.suptitle}>ПРОФЕССИОНАЛЬНЫЙ</div>
                    <h1 className={styles.title}>Бустинг Cs2</h1>
                    <p className={styles.text}>С нашим про-ресурсом беспокоиться не придется. Быстрый и надежный буст твоего аккаунта в Counter-Strike 2</p>
                    <div className={styles.buttons}>

                            <Link className={styles.btnRegular} href='#calcs'>Рассчитать буст</Link>
                        
            
                            <Link className={styles.btnDark} href='#benefits'>Узнать больше</Link>
 
                    </div>
                </div>
                <div className={styles.images}>
                    <div className={styles.terrorist}>
                    <Image className={styles.terroristImage} src='/hero/t.png' alt='лого' width={266} height={757} quality={100}></Image>
                    </div>
                    <div className={styles.counter}>
                    <Image className={styles.counterImage} src='/hero/ct.png' alt='лого' width={316} height={757}  quality={100}></Image>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection
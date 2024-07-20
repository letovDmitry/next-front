import React from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.phone}>
                    <h4 className={styles.title}>Номер телефона</h4>
                    <a className={styles.subtitle} href="tel:+7 999 999 99 99">+7 999 999 99 99</a>
                </div>
                <div className={styles.mail}>
                    <h4 className={styles.title}>Почта</h4>
                    <a className={styles.subtitle} href="mailto:info@anyboost.ru">info@anyboost.ru</a>
                </div>
                <div className={styles.social}>
                    <div className={styles.title}>Мы в соц. сетях</div>
                    <div className={styles.icons}>
                        <a href='https://t.me//anyboostclub'><Image src='/footer/tg.svg' alt='виза' width={45} height={45}></Image></a>
                        <a href='https://discord.gg/JpBGEfrc'><Image src='/footer/discord.svg' alt='виза' width={45} height={45}></Image></a>
                        <a href='https://vk.com/anyboostclub'><Image src='/footer/vk.svg' alt='виза' width={45} height={45}></Image></a>
                    </div>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.main}>
                    <Link className={styles.link} href='/contract-offer'>Договор оферты</Link>
                    <Link className={styles.link} href='#'>Реквизиты</Link>
                </div>
                <div className={styles.privacy}>
                    <Link className={styles.link} href='/privacy-policy'>Политика конфиденциальности</Link>
                </div>
            </div>
            <div className={styles.cards}>
                <Image src='/footer/visa.svg' alt='виза' width={100} height={32}></Image>
                <Image src='/footer/mc.svg' alt='виза' width={62} height={48}></Image>
                <Image src='/footer/mir.svg' alt='виза' width={118} height={32}></Image>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

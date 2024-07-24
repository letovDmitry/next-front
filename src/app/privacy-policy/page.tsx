import React from 'react';
import styles from './privacy.module.scss';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Политика Конфиденциальности",
    description: "Политика конфиденциальности для сайта anyboost.ru",
  };


const Page = () => {
  return (
    <div className={styles.privacy}>
        <div className='container'>
            <h1 className={styles.title}>Политика конфиденциальности для сайта anyboost.ru</h1>

            <div className={styles.body}>
                <h2 className={styles.heading}>ВВЕДЕНИЕ</h2>
                <p>
                    1.1 Настоящая Политика конфиденциальности описывает, какие личные данные собираются и обрабатываются сайтом eloboss.gg (далее - 'Сайт') и как эти данные используются.
                </p>
                <p>
                    1.2 Пользуясь Сайтом, вы соглашаетесь с условиями данной Политики конфиденциальности.
                </p>

                <h2 className={styles.heading}>СБОР И ИСПОЛЬЗОВАНИЕ ЛИЧНЫХ ДАННЫХ</h2>
                <p>
                    2.1 В процессе использования Сайта, мы можем собирать следующие личные данные:
                </p>
                <ul>
                    <li>Имя и контактная информация: при оформлении заказа или регистрации на Сайте, мы можем запрашивать ваше имя, адрес электронной почты и другую контактную информацию.</li>
                    <li>Платежные данные: при оплате услуг мы можем собирать данные о вашей платежной карте или других платежных средствах.</li>
                    <li>Информация о заказах: мы можем хранить информацию о ваших заказах, включая детали и статус заказа.</li>
                    <li>Информация о взаимодействии: мы можем записывать данные о вашем взаимодействии с Сайтом, такие как просмотренные страницы, клики, действия и т.д.</li>
                    <li>Информация об устройстве: мы можем собирать информацию о вашем устройстве, включая IP-адрес, тип браузера, язык браузера, версию операционной системы и т.д.</li>
                </ul>
                <p>
                    2.2 Мы используем собранные данные для следующих целей:
                </p>
                <ul>
                    <li>Предоставление услуг: обработка заказов, предоставление поддержки и выполнение запросов.</li>
                    <li>Улучшение Сайта: анализ данных помогает нам улучшить работу и предложить более качественные услуги.</li>
                    <li>Оптимизация маркетинга: анализ данных помогает нам адаптировать маркетинговые кампании под интересы пользователей.</li>
                </ul>

                <h2 className={styles.heading}>РАСКРЫТИЕ ЛИЧНЫХ ДАННЫХ</h2>
                <p>
                    3.1 Мы не передаем ваши личные данные третьим лицам, за исключением случаев, предусмотренных законом.
                </p>
                <p>
                    3.2 Мы можем сотрудничать с поставщиками услуг, которые помогают нам в обработке данных, но они обязаны соблюдать конфиденциальность.
                </p>

                <h2 className={styles.heading}>БЕЗОПАСНОСТЬ ДАННЫХ</h2>
                <p>
                    4.1 Мы предпринимаем все необходимые меры для защиты ваших личных данных от несанкционированного доступа, утраты или разглашения.
                </p>

                <h2 className={styles.heading}>ИЗМЕНЕНИЯ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</h2>
                <p>
                    5.1 Мы можем периодически обновлять нашу Политику конфиденциальности. Новая версия вступает в силу с момента ее публикации на Сайте.
                </p>

                <p className={styles.regards}>
                    С уважением,
                    <br />
                    Команда ANYBOOST.RU
                </p>
            </div>
        </div>
    </div>

  );
};

export default Page;

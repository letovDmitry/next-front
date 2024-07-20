import React from 'react';
import styles from './benefits.module.scss';

const Benefits = () => {
  return (
    <div id='benefits' className={styles.about}>
      <div className="container">
        <div className={styles.body}>
            <div className={styles.item}>
                <h4 className={styles.title}>Безопасно</h4>
                <div className={styles.text}>Наша команда состоит из очень опытных специалистов, которые понимают, насколько важен для нас наш имидж в CS2, поэтому мы всегда сохраняем максимальную анонимность наших клиентов.</div>
            </div>
            <div className={styles.item}>
                <h4 className={styles.title}>Дружелюбно</h4>
                <div className={styles.text}>Мы всегда уважаем своих клиентов, понимаем, как важен позитивный настрой, и стараемся дарить каждому клиенту только положительные эмоции во время выполнения заказа.</div>
            </div>
            <div className={styles.item}>
                <h4 className={styles.title}>С опытом</h4>
                <div className={styles.text}>Одним из главных преимуществ нашей команды является опыт работы в индустрии бустинга. Каждый из наших бустеров, как правило, имеет более 4500 эло в CS:GO. У них также есть профили на HLTV и опыт побед в онлайн и lan турнирах.</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits

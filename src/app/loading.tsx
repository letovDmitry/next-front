import styles from './loading.module.scss'

export default function Loading() {
  return (
    <main className={styles.main} >
      <div className={styles.loading}>
        <span className={styles.loadingDot}></span>
        <span className={styles.loadingDot}></span>
        <span className={styles.loadingDot}></span>
      </div>
    </main>
  );
}
import cn from 'src/lib/classnames'
import styles from './styles.module.scss'

export default function LoadingOverlay({ isOverlay = false, isLoadingTable = false, sizeSmall = false }) {
  return (
    <div
      className={cn(styles.appChangeRouterProgress, {
        [styles.overlay]: isOverlay,
        [styles.loadingTable]: isLoadingTable,
        [styles.sizeSmall]: sizeSmall
      })}
    >
      <div className={styles.loader}>
        <div className={`${styles.inner} ${styles.one}`} />
        <div className={`${styles.inner} ${styles.two}`} />
        <div className={`${styles.inner} ${styles.three}`} />
      </div>
    </div>
  )
}

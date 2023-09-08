import clsx from 'clsx'
import ActionButton from './components/ActionButton/ActionButton'
import styles from './page.module.scss'

const page = () => {
  return (
    <div className={styles.main}>
      <div className={styles.headingBox}>
        <h2 className={styles.heading}>単語リスト</h2>

        <div className={styles.actionBox}>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isEdit'>編集</ActionButton>
          </div>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isAdd'>追加</ActionButton>
          </div>
        </div>
      </div>

      <div className={styles.mainInner}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href='' className={styles.link}>
              apple
            </a>
          </li>
          <li className={styles.item}>
            <a href='' className={styles.link}>
              apple
            </a>
          </li>

          <li className={styles.item}>
            <a href='' className={styles.link}>
              apple
            </a>
          </li>
        </ul>

        <div className={styles.buttonBox}>
          <a href='' className={styles.button}>
            テストを開始する
          </a>
        </div>
      </div>
    </div>
  )
}

export default page

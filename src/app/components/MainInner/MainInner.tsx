import styles from './MainInner.module.scss'

type Props = {
  children: React.ReactNode
}

const MainInner: React.FC<Props> = ({ children }) => {
  return <div className={styles.mainInner}>{children}</div>
}

export default MainInner

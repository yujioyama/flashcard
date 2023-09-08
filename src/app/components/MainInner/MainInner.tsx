import styles from './MainInner.module.scss'

type Props = {
  children: React.ReactNode
}

const MainInner: React.FC<Props> = ({ children }) => {
  return <main className={styles.mainInner}>{children}</main>
}

export default MainInner

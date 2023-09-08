import styles from './Main.module.scss'

type Props = {
  children: React.ReactNode
}

const Main: React.FC<Props> = ({ children }) => {
  return <main className={styles.main}>{children}</main>
}

export default Main

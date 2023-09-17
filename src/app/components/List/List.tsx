import { ReactNode } from 'react'
import styles from './List.module.scss'

type Props = {
  children: ReactNode
}

const List: React.FC<Props> = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>
}

export default List

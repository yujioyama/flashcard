import { ReactNode } from 'react'
import styles from './ButtonBox.module.scss'

type Props = {
  children: ReactNode
}

const ButtonBox: React.FC<Props> = ({ children }) => {
  return <div className={styles.buttonBox}>{children}</div>
}

export default ButtonBox

import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ExecuteButton.module.scss'

type Props = {
  children: ReactNode
  color?: 'warning'
}

const ExecuteButton: React.FC<Props> = ({ children, color }) => {
  return (
    <button className={clsx(styles.button, color === 'warning' && styles.isWarning)}>
      {children}
    </button>
  )
}

export default ExecuteButton

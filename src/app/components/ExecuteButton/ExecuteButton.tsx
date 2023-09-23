import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ExecuteButton.module.scss'

type Props = {
  children: ReactNode
  color?: 'warning'
  onClick?: any // TODO
}

const ExecuteButton: React.FC<Props> = ({ children, color, onClick }) => {
  return (
    <button
      className={clsx(styles.button, color === 'warning' && styles.isWarning)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ExecuteButton

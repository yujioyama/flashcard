import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  type: 'isEdit' | 'isAdd'
  children: ReactNode
  onClick: () => void
}

const ActionButton: React.FC<Props> = ({ type, children, onClick }) => {
  return (
    <button className={clsx(styles.actionButton, styles[type])} onClick={onClick}>
      {children}
    </button>
  )
}

export default ActionButton

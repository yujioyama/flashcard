import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  type: 'isEdit' | 'isAdd'
  children: ReactNode
}

const ActionButton: React.FC<Props> = ({ type, children }) => {
  return <button className={clsx(styles.actionButton, styles[type])}>{children}</button>
}

export default ActionButton

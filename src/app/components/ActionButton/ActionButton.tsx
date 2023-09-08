import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  type: 'isEdit' | 'isAdd'
  children: ReactNode
  onClick: () => void
  dataModal?: string
}

const ActionButton: React.FC<Props> = ({ type, children, onClick, dataModal }) => {
  return (
    <button
      className={clsx(styles.actionButton, styles[type])}
      onClick={onClick}
      data-modal={dataModal}
    >
      {children}
    </button>
  )
}

export default ActionButton

import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  type: 'isDelete' | 'isAdd'
  children: ReactNode
  dataModal?: string
  onClick: any // TODO: fix this later
  isDisabled?: boolean
}

const ActionButton: React.FC<Props> = ({ type, children, dataModal, onClick, isDisabled }) => {
  return (
    <button
      className={clsx(styles.actionButton, styles[type], isDisabled && styles.isDisabled)}
      onClick={onClick}
      data-modal={dataModal}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default ActionButton

import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  type: 'isEdit' | 'isAdd'
  isEditing?: boolean
  children: ReactNode
  dataModal?: string
  onClick: any // TODO: fix this later
}

const ActionButton: React.FC<Props> = ({ type, children, dataModal, isEditing, onClick }) => {
  return (
    <button
      className={clsx(styles.actionButton, styles[type], isEditing && styles.isEditing)}
      onClick={onClick}
      data-modal={dataModal}
    >
      {children}
    </button>
  )
}

export default ActionButton

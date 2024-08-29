import clsx from 'clsx'
import styles from './Modal.module.scss'

type Props = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, title }) => {
  return (
    <>
      <div className={clsx(styles.overlay, isOpen && styles.isOpen)} onClick={onClose}></div>
      <div className={clsx(styles.modal, isOpen && styles.isOpen)}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button className={styles.close} onClick={onClose}>
            close
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </>
  )
}

export default Modal

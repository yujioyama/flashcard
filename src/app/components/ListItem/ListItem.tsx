import clsx from 'clsx'
import { MouseEvent } from 'react'
import styles from './ListItem.module.scss'
import type { WordType } from '@/types/word'

type Props = {
  word: WordType
  onClose: () => void
  selectedModal: string
  isEditing: boolean
  onModalOpen: (event: MouseEvent<HTMLButtonElement>, word: WordType) => void
}

const ListItem: React.FC<Props> = ({ word, isEditing, onModalOpen }) => {
  const { word: wordSpelling } = word

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={clsx(styles.button, styles.isEdit)}>
          {wordSpelling}
          <div className={styles.actionBox}>
            <button
              className={clsx(styles.iconButton, styles.isDelete)}
              onClick={(event) => onModalOpen(event, word)}
              data-modal='modal-delete'
            >
              delete
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.button}
          data-modal='modal-definition'
          onClick={(event) => onModalOpen(event, word)}
        >
          {wordSpelling}
        </button>
      )}
    </li>
  )
}

export default ListItem

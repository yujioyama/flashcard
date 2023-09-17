import clsx from 'clsx'
import { MouseEvent } from 'react'
import type { Word } from '../../types/word'
import styles from './ListItem.module.scss'

type Props = {
  word: Word
  onClose: () => void
  selectedModal: string
  isEditing: boolean
  onModalOpen: (event: MouseEvent<HTMLButtonElement>, word: Word) => void
}

const ListItem: React.FC<Props> = ({ word, isEditing, onModalOpen }) => {
  const { word: wordSpelling, id } = word

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={clsx(styles.button, styles.isEdit)}>
          {wordSpelling}
          <div className={styles.actionBox}>
            <button className={clsx(styles.iconButton, styles.isEdit)}>編集</button>
            <button
              className={clsx(styles.iconButton, styles.isDelete)}
              onClick={(event) => onModalOpen(event, word)}
              data-modal='modal-delete'
            >
              削除
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

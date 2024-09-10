import { MouseEvent } from 'react'
import styles from './ListItem.module.scss'
import type { WordType } from '@/types/word'

type Props = {
  word: WordType
  onClose: () => void
  onModalOpen: (event: MouseEvent<HTMLButtonElement>, word: WordType) => void
  onSelectDeleteWord: (id: number) => void
}

const ListItem: React.FC<Props> = ({ word, onModalOpen, onSelectDeleteWord }) => {
  const { word: wordSpelling, id } = word

  return (
    <li className={styles.item}>
      <input
        type='checkbox'
        name='delete'
        className={styles.checkbox}
        onChange={() => onSelectDeleteWord(id)}
      />
      <button
        className={styles.button}
        data-modal='modal-definition'
        onClick={(event) => onModalOpen(event, word)}
      >
        {wordSpelling}
      </button>
    </li>
  )
}

export default ListItem

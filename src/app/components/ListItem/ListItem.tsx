import clsx from 'clsx'
import type { Word } from '../../types/word'
import DefinitionList from '../DefinitionList/DefinitionList'
import Modal from '../Modal/Modal'
import styles from './ListItem.module.scss'

type Props = {
  word: Word
  onClose: () => void
  selectedModal: string
  isEditing: boolean
  onModalOpen: () => void
}

const ListItem: React.FC<Props> = ({ word, onClose, selectedModal, isEditing, onModalOpen }) => {
  const { word: wordSpelling, meanings } = word

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={clsx(styles.button, styles.isEdit)}>
          {wordSpelling}
          <div className={styles.actionBox}>
            <button className={clsx(styles.iconButton, styles.isEdit)}>編集</button>
            <button className={clsx(styles.iconButton, styles.isDelete)}>削除</button>
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

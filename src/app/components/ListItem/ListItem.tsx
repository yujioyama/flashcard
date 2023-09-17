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
}

const ListItem: React.FC<Props> = ({ word, onClose, selectedModal, isEditing }) => {
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
        <button className={styles.button} data-modal={wordSpelling}>
          {wordSpelling}
        </button>
      )}

      <Modal title={wordSpelling} onClose={onClose} isOpen={selectedModal === wordSpelling}>
        <ul className={styles.listLarge}>
          {meanings.map((meaning, index) => {
            const { partOfSpeech, definitions } = meaning
            return (
              <li
                className={styles.itemLarge}
                key={`${wordSpelling}_item_in_modal_${String(index)}`}
              >
                <div className={styles.heading}>
                  <span className={styles.headingText}>品詞</span>
                  <span className={styles.partOfSpeech}>{partOfSpeech}</span>
                </div>

                <DefinitionList definitions={definitions} index={index} />
              </li>
            )
          })}
        </ul>
      </Modal>
    </li>
  )
}

export default ListItem

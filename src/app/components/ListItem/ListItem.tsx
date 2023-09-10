import clsx from 'clsx'
import type { Word } from '../../types/word'
import Modal from '../Modal/Modal'
import styles from './ListItem.module.scss'

type Props = {
  word: Word
  onClose: () => void
  selectedModal: string
  isEdit: boolean
}

const ListItem: React.FC<Props> = ({ word, onClose, selectedModal, isEdit }) => {
  const { word: wordSpelling, meanings } = word

  return (
    <li className={styles.item}>
      {isEdit ? (
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
              <li className={styles.itemLarge} key={`${wordSpelling}_item`}>
                <div className={styles.heading}>
                  <span className={styles.headingText}>品詞</span>
                  <span className={styles.partOfSpeech}>{partOfSpeech}</span>
                </div>

                <dl className={styles.listMedium} key={index}>
                  {definitions.map((definition, index) => {
                    const { definition: definitionDescription, example } = definition

                    return (
                      <div className={styles.itemMedium} key={definitionDescription}>
                        <div className={styles.row}>
                          <dt className={styles.title}>意味</dt>
                          <dd className={styles.definition}>{definitionDescription}</dd>
                        </div>

                        {example && (
                          <div className={styles.row}>
                            <dt className={styles.title}>例文</dt>
                            <dd className={styles.definition}>{example}</dd>
                          </div>
                        )}

                        <span className={styles.number}>{String(index + 1)}</span>
                      </div>
                    )
                  })}
                </dl>
              </li>
            )
          })}
        </ul>
      </Modal>
    </li>
  )
}

export default ListItem

import styles from './DefinitionList.module.scss'
import type { WordType } from '@/types/word'

type Props = {
  word: WordType
}

const DefinitionList: React.FC<Props> = ({ word }) => {
  return (
    <ul className={styles.listLarge}>
      {word.meanings?.map((meaning, index) => {
        const { partOfSpeech, definitions } = meaning
        return (
          <li className={styles.itemLarge} key={`${word.word}_item_in_modal_${String(index)}`}>
            <div className={styles.heading}>
              <span className={styles.headingText}>part of speech</span>
              <span className={styles.partOfSpeech}>{partOfSpeech}</span>
            </div>

            <dl className={styles.list} key={index}>
              {definitions.map((definition, index) => {
                const { definition: definitionDescription, example } = definition

                return (
                  <div className={styles.item} key={definitionDescription}>
                    <div className={styles.row}>
                      <dt className={styles.title}>meaning</dt>
                      <dd className={styles.definition}>{definitionDescription}</dd>
                    </div>

                    {example && (
                      <div className={styles.row}>
                        <dt className={styles.title}>example sentence</dt>
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
  )
}

export default DefinitionList

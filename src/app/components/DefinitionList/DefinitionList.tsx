import styles from './DefinitionList.module.scss'
import type { Word } from '@/app/types/word'

// Todo Pickを使ってなんとかできそうだけど一旦保留
// type Props = Pick<Word, 'meanings.definitions'>

const DefinitionList = ({ definitions, index }) => {
  return (
    <dl className={styles.list} key={index}>
      {definitions.map((definition, index) => {
        const { definition: definitionDescription, example } = definition

        return (
          <div className={styles.item} key={definitionDescription}>
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
  )
}

export default DefinitionList

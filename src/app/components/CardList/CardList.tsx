import type { Word } from '../../../../types/word'
import Card from '../Card/Card'
import styles from './CardList.module.scss'

type Props = {
  words: Word[]
  onDeleteWord: (word: Word) => void
}

const CardList: React.FC<Props> = ({ words, onDeleteWord }) => {
  if (words.length === 0) return <p>登録された単語はありません</p>

  return (
    <ul className={styles.list}>
      {words.map((word, index) => (
        <Card word={word} key={word.id} onDeleteWord={onDeleteWord} />
      ))}
    </ul>
  )
}

export default CardList

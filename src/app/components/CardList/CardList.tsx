import type { Word } from '../../../../types/word'
import Card from '../Card/Card'
import styles from './CardList.module.scss'

const CardList: React.FC<Word[]> = (words) => {
  console.log(words.length)

  if (words.length === 0) return <p>登録された単語はありません</p>

  return (
    <ul className={styles.list}>
      {words.map((word, index) => (
        <Card word key={word.id} />
      ))}
    </ul>
  )
}

export default CardList

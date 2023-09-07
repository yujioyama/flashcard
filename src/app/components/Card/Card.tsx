import clsx from 'clsx'
import { useState } from 'react'
import type { Word } from '../../../../types/word'
import styles from './Card.module.scss'

type Props = {
  word: Word
}

const Card: React.FC<Props> = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handlePronunciation = (pronunciation: string) => {
    const audio = new Audio(pronunciation)
    audio
      .play()
      .then(() => {
        console.log('Audio started!')
      })
      .catch((error) => console.warn(error))
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const { word: wordSpelling, phonetics, meanings } = word

  return (
    <li className={styles.card} onClick={handleFlip}>
      <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
        <p>{wordSpelling}</p>
        {phonetics &&
          phonetics.map(
            (pronunciation, index) =>
              pronunciation && (
                <p
                  onClick={() => handlePronunciation(pronunciation.audio)}
                  key={`${pronunciation.audio}_${String(index)}`}
                >
                  発音
                </p>
              ),
          )}
      </div>

      <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
        {meanings &&
          meanings.map((meaning, index) => (
            <div key={`${meaning.definitions[0].definition}_meanings_${String(index)}`}>
              <p key={meaning.partOfSpeech}>{meaning.partOfSpeech}</p>
              {meaning.definitions.map((definition, index) => {
                const { definition: definitionDesc, example } = definition

                return (
                  <div key={`${definitionDesc}_definition_${String(index)}`}>
                    <p>意味：{definitionDesc}</p>
                    {example && <p key={example}>例文：{example}</p>}
                  </div>
                )
              })}
            </div>
          ))}
      </div>
    </li>
  )
}

export default Card

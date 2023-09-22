'use client'
import clsx from 'clsx'
import React, { useState } from 'react'
import type { Word } from '../../types/word'
import styles from './Card.module.scss'

type Props = {
  text: string
}

const Card: React.FC<Props> = ({ text }) => {
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

  return (
    <div className={styles.card} onClick={handleFlip}>
      <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
        <p className={styles.frontText}>{text}</p>
      </div>

      <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
        裏
        {/* {meanings &&
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
          ))} */}
      </div>
    </div>
  )
}

export default Card

'use client'
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import type { WordType } from '../../types/word'
import DefinitionList from '../DefinitionList/DefinitionList'
import styles from './Card.module.scss'

type Props = {
  word: WordType
  isActive: boolean
}

const Card: React.FC<Props> = ({ word, isActive }) => {
  const { word: wordSpelling, phonetics } = word

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  useEffect(() => {
    if (!isActive) setIsFlipped(false)
  }, [isActive])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className={styles.card} onClick={handleFlip}>
      <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
        <div className={styles.cardInnerFront}>
          <span className={styles.frontText}>{wordSpelling}</span>
          <ul className={styles.phoneticsList}>
            {phonetics.map((phonetic) => (
              <li className={styles.phoneticsItem} key={phonetic.text}>
                {phonetic.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
        <DefinitionList word={word} />
      </div>
    </div>
  )
}

export default Card

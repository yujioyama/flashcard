'use client'
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import type { Word } from '../../types/word'
import DefinitionList from '../DefinitionList/DefinitionList'
import styles from './Card.module.scss'

type Props = {
  word: Word
  isActive: boolean
}

const Card: React.FC<Props> = ({ word, isActive }) => {
  const { word: wordSpelling } = word

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  useEffect(() => {
    if (!isActive) setIsFlipped(false)
  }, [isActive])

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
        <p className={styles.frontText}>{wordSpelling}</p>
      </div>

      <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
        <DefinitionList word={word} />
      </div>
    </div>
  )
}

export default Card

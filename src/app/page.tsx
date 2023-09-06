'use client'
import axios, { AxiosResponse } from 'axios'
import clsx from 'clsx'
import { NextResponse } from 'next/server'
import { FormEventHandler, useState, use, useEffect } from 'react'
import type { Word } from '../../types/word'
import styles from './page.module.scss'

export default function Home() {
  const [newWord, setNewWord] = useState<string>('')
  const [words, setWords] = useState<Word[]>([])
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const BASE_URL = 'http://localhost:8000'

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch(`${BASE_URL}/words`)

        const data = await res.json()

        setWords(data)
      } catch {
        alert('There was an error loading')
      }
    }
    fetchWords()
  }, [])

  async function createWord(newWord) {
    try {
      const res = await fetch(`${BASE_URL}/words`, {
        method: 'POST',
        body: JSON.stringify(newWord),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      setWords((words) => [...words, data])
    } catch {
      alert('There was an error loading')
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const response: AxiosResponse<Word[]> = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
    )

    const [word] = response.data

    if (words.some((e) => e.word === word.word)) return

    await createWord(word)

    setWords([...words, word])

    setNewWord('')
  }

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
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <p>単語・イディオムを追加</p>
        <input type='text' value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        <button>追加</button>
      </form>

      <ul className={styles.list}>
        {words.map((word, index) => (
          <li key={`${word.word}_${String(index)}`} className={styles.card} onClick={handleFlip}>
            <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
              <p>{word.word}</p>
              {word.phonetics.map(
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
              {word.meanings.map((meaning, index) => (
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
        ))}
      </ul>
    </main>
  )
}

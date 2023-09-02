'use client'
import axios, { AxiosResponse } from 'axios'
import clsx from 'clsx'
import { FormEventHandler, useState, use, cache } from 'react'
import type { Word } from '../../types/word'
import styles from './page.module.scss'

const getWords = cache(() => fetch('http://localhost:3000/api/words').then((res) => res.json()))

export default function Home() {
  const [newWord, setNewWord] = useState<string>('')
  const [wordList, setWordList] = useState<Word[]>([])
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const words = use<Word[]>(getWords())

  console.log(words)

  const postWord = async (word: Word) => {
    const res = await fetch('http://localhost:3000/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    })

    const json = await res.json()
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const response: AxiosResponse<Word[]> = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
    )

    const [word] = response.data

    if (wordList.some((e) => e.word === word.word)) return

    use(postWord(word))

    setWordList([...wordList, word])

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
        {wordList.map((word) => (
          <li key={word.word} className={styles.card} onClick={handleFlip}>
            <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
              <p>{word.word}</p>
              {word.phonetics.map((pronunciation, index) => (
                <p
                  onClick={() => handlePronunciation(pronunciation.audio)}
                  key={pronunciation.audio}
                >
                  発音
                </p>
              ))}
            </div>

            <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
              {word.meanings.map((meaning) => (
                <div key={meaning.definitions[0].definition}>
                  <p key={meaning.partOfSpeech}>{meaning.partOfSpeech}</p>
                  {meaning.definitions.map((definition, index) => {
                    const { definition: definitionDesc, example } = definition

                    return (
                      <div key={definitionDesc}>
                        <p key={definitionDesc}>意味：{definitionDesc}</p>
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

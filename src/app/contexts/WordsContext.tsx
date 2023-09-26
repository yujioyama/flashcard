'use client'
import axios, { AxiosResponse } from 'axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { WORDS_API_PATH } from './../config'
import type { Word } from '@/types/word'

const WordsContext = createContext<any | null>(null)

type Props = {
  children: ReactNode
}

const WordsProvider = ({ children }: Props) => {
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    async function fetchWords() {
      try {
        const response: AxiosResponse<Word[]> = await axios.get(WORDS_API_PATH)

        const words = response.data

        setWords(words)
      } catch {
        alert('There was an error fetching words')
      }
    }

    // awaitをつけた書き方がわからない。即時関数でも無理だった。
    // eslint-disable-next-line
    fetchWords()
  }, [words])

  async function createWord(newWord: Word) {
    try {
      const { data: createdWord }: AxiosResponse<Word> = await axios.post(WORDS_API_PATH, newWord)

      setWords((words) => [...words, createdWord])
    } catch {
      alert('単語を追加できませんでした。')
    }
  }

  async function deleteWord(id: number) {
    try {
      await axios.delete(`${WORDS_API_PATH}?id=${String(id)}`)

      const wordsAfterDeletion = words.filter((word) => word.id !== id)

      setWords(wordsAfterDeletion)
    } catch {
      alert('単語を消せませんでした。')
    }
  }

  async function updateWord(id: number, newWord: string) {
    try {
      // 配列の場合はOmit<>の後に[]を記載
      const response: AxiosResponse<Omit<Word, 'id'>[]> = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
      )

      const [overwritingWord] = response.data

      console.log(response.data)

      await axios.put(WORDS_API_PATH, {
        overwritingWord,
        id,
      })

      const wordsAfterUpdate = words.map((word) => {
        if (word.id === id) {
          // 無理やりアサーションでWord型に指定
          return {
            id,
            ...overwritingWord,
          }
        } else {
          return word
        }
      })

      setWords(wordsAfterUpdate)
    } catch {
      alert('単語を更新できませんでした。')
    }
  }

  return (
    <WordsContext.Provider value={{ words, createWord, deleteWord, updateWord }}>
      {children}
    </WordsContext.Provider>
  )
}

const useWords = () => {
  const context = useContext(WordsContext)

  if (context === undefined) throw new Error('WordsContextがWordsProviderの外で使われています。')

  return context
}

export { WordsProvider, useWords }

import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import type { Word } from '../types/word'
import { WORDS_API_PATH } from './../config'

export const useFetchWords = () => {
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
  }, [])

  return { words, setWords }
}

import { WORDS_API_PATH } from './../config'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import type { Word } from '../types/word'

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

    fetchWords()
  }, [])

  return { words, setWords }
}

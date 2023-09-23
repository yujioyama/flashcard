import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { SERVER_BASE_URL } from '../config'
import type { Word } from '../types/word'

export const useFetchWords = () => {
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    async function fetchWords() {
      try {
        const response: AxiosResponse<Word[]> = await axios.get(`${SERVER_BASE_URL}`)

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

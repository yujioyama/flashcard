import { useEffect, useState } from 'react'
import { SERVER_BASE_URL } from '../config'
import type { Word } from '../types/word'

export const useFetchWords = () => {
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch(`${SERVER_BASE_URL}`)

        const data = await res.json()

        setWords(data)
      } catch {
        alert('There was an error fetching words')
      }
    }
    fetchWords()
  }, [])

  return { words, setWords }
}

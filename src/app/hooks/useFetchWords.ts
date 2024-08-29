import { useEffect, useState } from 'react'
import type { WordType } from '../types/word'
import supabase from '@/lib/supabase'

export const useFetchWords = () => {
  const [words, setWords] = useState<WordType[]>([])

  useEffect(() => {
    async function fetchWords() {
      try {
        const { data: wordData, error: wordError } = await supabase.from('word').select(`
          *,
          phonetics (
            text,
            audio
          ),
          meanings (
            partOfSpeech,
            definitions (
              definition,
              example,
              synonyms,
              antonyms
            )
          )
        `)

        if (wordData === null) return

        setWords(wordData)
      } catch (error) {
        console.error('There was an error fetching words:', error)
      }
    }

    // eslint-disable-next-line
    fetchWords()
  }, [])

  return { words, setWords }
}

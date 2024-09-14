'use client'
import { useEffect, useState } from 'react'
import Main from '../components/Main/Main'
import Button from '@/components/Button/Button'
import ButtonBox from '@/components/ButtonBox/ButtonBox'
import Slider from '@/components/Slider/Slider'
import supabase from '@/lib/supabase'
import type { WordType } from '@/types/word'

const Test = () => {
  const [words, setWords] = useState<WordType[]>([])

  useEffect(() => {
    async function fetchWords() {
      try {
        const { data: wordData } = await supabase.from('word').select(`
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

    void fetchWords()
  }, [])

  return (
    <Main>
      <Slider words={words} />

      <ButtonBox>
        <Button href='/'>finish testing</Button>
      </ButtonBox>
    </Main>
  )
}

export default Test

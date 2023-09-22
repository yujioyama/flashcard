'use client'
import Main from '../components/Main/Main'
import { useFetchWords } from '../hooks/useFetchWords'
import Slider from '@/components/Slider/Slider'

const Test = () => {
  const { words } = useFetchWords()

  return (
    <Main>
      <Slider words={words} />
    </Main>
  )
}

export default Test

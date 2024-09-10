'use client'
import Main from '../components/Main/Main'
import { useFetchWords } from '../hooks/useFetchWords'
import Button from '@/components/Button/Button'
import ButtonBox from '@/components/ButtonBox/ButtonBox'
import Slider from '@/components/Slider/Slider'

const Test = () => {
  const { words } = useFetchWords()

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

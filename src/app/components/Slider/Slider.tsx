import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Word } from '../../types/word'
import Card from '../Card/Card'
import styles from './Slider.module.scss'
import { SlideNextButton, SlidePrevButton } from './SliderButton/SliderButton'
import { shuffleArray } from '@/utilities/shuffleArray'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = {
  words: Word[]
}

const Slider: React.FC<Props> = ({ words }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const maxSlideNumber = words.length

  // 次へ/前へボタンを押すたびにactiveIndexが更新され、Sliderコンポーネントが再レンダリングされてしまうため、
  // そのままだと次へ/前へボタンを押すたびに、スライドが毎回シャッフルされてしまう。しかし、スライドをシャッフルしたいのはページを開いた時のみである。
  // useMemo化することで、次へ/前へボタンを押してactiveIndexが更新されても、wordsが更新されない限り、shuffledWordsは更新されない。
  const shuffledWords = useMemo(() => shuffleArray(words), [words])

  const handlePronunciation = (pronunciation: string) => {
    const audio = new Audio(pronunciation)

    audio
      .play()
      .then(() => {
        console.log('Audio started!')
      })
      .catch((error) => console.warn(error))
  }

  const pronunciations = shuffledWords[activeIndex]?.phonetics
    .map(({ audio }) => audio)
    .filter((audio) => audio) // たまにpronunciationが空の時があるため

  return (
    <>
      <Swiper
        spaceBetween={100}
        centeredSlides
        slidesPerView={1.5}
        className={styles.swiper}
        pagination={{
          type: 'progressbar',
          progressbarFillClass: `${styles.progressbarFill}`,
          horizontalClass: `${styles.horizontal}`,
        }}
        modules={[Pagination]}
      >
        <SlidePrevButton activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <SlideNextButton
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          maxSlideNumber={maxSlideNumber}
        />

        {shuffledWords.map((word) => {
          return (
            <SwiperSlide key={word.id}>
              {({ isActive }) => (
                <div className={clsx(styles.slideInner, isActive && styles.isActive)}>
                  <Card word={word} isActive={isActive} />
                </div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>

      {pronunciations && (
        <div className={styles.buttonWrap}>
          {pronunciations.map((pronunciation) => (
            <button
              onClick={() => handlePronunciation(pronunciation)}
              key={pronunciation}
              className={styles.pronunciationButton}
            >
              発音
            </button>
          ))}
        </div>
      )}
    </>
  )
}
export default Slider

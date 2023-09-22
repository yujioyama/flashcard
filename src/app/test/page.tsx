'use client'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react'
import Card from '../components/Card/Card'
import Main from '../components/Main/Main'
import { useFetchWords } from '../hooks/useFetchWords'
import { shuffleArray } from '../utilities/shuffleArray'
import styles from './page.module.scss'
import 'swiper/css'

function SlideNextButton() {
  const swiper = useSwiper()

  return (
    <button onClick={() => swiper.slideNext()} className={clsx(styles.button, styles.isNext)}>
      次へ
    </button>
  )
}

function SlidePrevButton() {
  const swiper = useSwiper()

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className={clsx(styles.button, styles.isPrev, swiper.activeIndex !== 0 && styles.isActive)}
    >
      前へ
    </button>
  )
}

const Test = () => {
  const { words, setWords } = useFetchWords()

  const maxSlideNumber = words.length

  return (
    <Main>
      <Swiper spaceBetween={100} centeredSlides slidesPerView={1.5} className={styles.swiper}>
        <SlidePrevButton />
        <SlideNextButton />

        {shuffleArray(words).map((word) => {
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
    </Main>
  )
}

export default Test

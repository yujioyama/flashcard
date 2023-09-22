'use client'
import clsx from 'clsx'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react'
import Card from '../components/Card/Card'
import Main from '../components/Main/Main'
import MainInner from '../components/MainInner/MainInner'
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
    <button onClick={() => swiper.slidePrev()} className={clsx(styles.button, styles.isPrev)}>
      前へ
    </button>
  )
}

const Test = () => {
  const swiperSlide = useSwiperSlide()
  console.log(swiperSlide)

  return (
    <Main>
      <Swiper spaceBetween={50} centeredSlides slidesPerView={3} className={styles.swiper}>
        <SlidePrevButton />
        <SwiperSlide className={styles.slide}>
          <Card text='1' />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Card text='1' />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Card text='1' />
        </SwiperSlide>
        {/* {['1', '2', '3', '4', '5', '6'].map((num) => {
          return (
            <SwiperSlide
              className={clsx(styles.slide, swiperSlide.isActive && styles.isActive)}
              key={num}
            >
              <Card text='1' />
            </SwiperSlide>
          )
        })} */}
      </Swiper>
    </Main>
  )
}

export default Test

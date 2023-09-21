'use client'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import Card from '../components/Card/Card'
import Main from '../components/Main/Main'
import MainInner from '../components/MainInner/MainInner'
import styles from './page.module.scss'
import 'swiper/css'

function SlideNextButton() {
  const swiper = useSwiper()

  return <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
}

const Home = () => {
  const swiper = useSwiper()
  return (
    <Main>
      <MainInner>
        <Swiper slidesPerView={1} className={styles.swiper}>
          <SlideNextButton />
          <SwiperSlide>
            <Card text='1' />
          </SwiperSlide>
          <SwiperSlide>
            <Card text='2' />
          </SwiperSlide>
          <SwiperSlide>
            <Card text='3' />
          </SwiperSlide>
          <SwiperSlide>
            <Card text='4' />
          </SwiperSlide>
        </Swiper>
      </MainInner>
    </Main>
  )
}

export default Home

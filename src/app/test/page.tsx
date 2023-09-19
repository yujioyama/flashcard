'use client'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import Card from '../components/Card/Card'
import Main from '../components/Main/Main'
import MainInner from '../components/MainInner/MainInner'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Home = () => {
  const swiper = useSwiper()
  return (
    <Main>
      <MainInner>
        <button onClick={() => swiper.slideNext()}>次</button>
        <Swiper spaceBetween={50} slidesPerView={1}>
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

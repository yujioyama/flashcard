import clsx from 'clsx'
import { useSwiper } from 'swiper/react'
import styles from './SliderButton.module.scss'

type Props = {
  activeIndex: number
  setActiveIndex: (index: number) => void
  maxSlideNumber: number
}

export const SlideNextButton: React.FC<Props> = ({
  activeIndex,
  setActiveIndex,
  maxSlideNumber,
}) => {
  const swiper = useSwiper()

  const handleSlideNext = () => {
    swiper.slideNext()
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <button
      onClick={handleSlideNext}
      className={clsx(
        styles.button,
        styles.isNext,
        activeIndex + 1 === maxSlideNumber && styles.isHidden,
      )}
    >
      next
    </button>
  )
}

export const SlidePrevButton: React.FC<Omit<Props, 'maxSlideNumber'>> = ({
  activeIndex,
  setActiveIndex,
}) => {
  const swiper = useSwiper()

  const handleSlidePrev = () => {
    swiper.slidePrev()
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <button
      onClick={handleSlidePrev}
      className={clsx(styles.button, styles.isPrev, activeIndex === 0 && styles.isHidden)}
    >
      previous
    </button>
  )
}

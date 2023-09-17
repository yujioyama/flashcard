import { useEffect, useRef, useState } from 'react'
import { isIOSUserAgent } from '../utilities/isIOSUserAgent'

export const useBodyFixed = () => {
  const [bodyFixed, setBodyFixed] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const isFirstRender = useRef(false)

  useEffect(() => {
    // 初回レンダリング時は発火しないようにする
    if (!isFirstRender.current) {
      isFirstRender.current = true
      return
    }

    const body = document.querySelector('body')
    if (!body) return

    const isIOS = isIOSUserAgent()

    if (bodyFixed) {
      if (isIOS) {
        setScrollPosition(window.pageYOffset)
        body.style.position = 'fixed'
        body.style.top = `-${scrollPosition}px`
      } else {
        body.style.overflow = 'hidden'
      }
    } else {
      if (isIOS) {
        body.style.removeProperty('position')
        body.style.removeProperty('top')
        window.scrollTo(0, scrollPosition)
      } else {
        body.style.removeProperty('overflow')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyFixed])

  return { bodyFixed, setBodyFixed }
}

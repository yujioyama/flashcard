import { useEffect, useRef, useState } from 'react'
import { isIOSUserAgent } from '../utilities/isIOSUserAgent'

export const useBodyFixed = () => {
  const [isBodyFixed, setIsBodyFixed] = useState<boolean>(false)
  const scrollPosition = useRef(0)
  const isFirstRender = useRef(false)

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true
      return
    }

    const body = document.querySelector('body')
    if (!body) return

    const isIOS = isIOSUserAgent()

    if (isBodyFixed) {
      if (isIOS) {
        scrollPosition.current = window.pageYOffset
        body.style.position = 'fixed'
        body.style.top = `-${scrollPosition.current}px`
      } else {
        body.style.overflow = 'hidden'
      }
    } else {
      if (isIOS) {
        body.style.removeProperty('position')
        body.style.removeProperty('top')
        window.scrollTo(0, scrollPosition.current)
      } else {
        body.style.removeProperty('overflow')
      }
    }
  }, [isBodyFixed])

  return { setIsBodyFixed }
}

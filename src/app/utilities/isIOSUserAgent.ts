export const isIOSUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  const isIOS =
    ua.indexOf('iphone') > -1 ||
    ua.indexOf('ipad') > -1 ||
    (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
  return isIOS
}

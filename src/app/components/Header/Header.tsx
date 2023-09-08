import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link href='/'>
          <Image src='/icons/white/logo.svg' alt='ENGLISH CARD' width={462} height={74} />
        </Link>
      </h1>
    </header>
  )
}

export default Header

import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './Button.module.scss'

type Props = {
  href: string
  children: ReactNode
}

const Button: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  )
}

export default Button

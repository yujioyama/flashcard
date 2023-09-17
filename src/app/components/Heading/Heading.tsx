import { ReactNode } from 'react'

import styles from './Heading.module.scss'

type Props = {
  className?: 'h2'
  children: ReactNode
  as?: 'h2'
}

const Heading: React.FC<Props> = ({ as: Component = 'h2', className = 'h2', children }) => {
  return <Component className={styles[className]}>{children}</Component>
}

export default Heading

import clsx from 'clsx'
import { MouseEvent } from 'react'
import styles from './Pagination.module.scss'

type Props = {
  totalCount: number
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const Pagination: React.FC<Props> = ({ totalCount, onClick }: Props) => {
  const PER_PAGE = 10

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  const isCurrent = true

  return (
    <ol className={styles.list}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={styles.list}>
          <button
            type='button'
            className={clsx(styles.link, isCurrent && styles.isCurrent)}
            onClick={onClick}
            data-page-number={index}
          >
            {number}
          </button>
        </li>
      ))}
    </ol>
  )
}

export default Pagination

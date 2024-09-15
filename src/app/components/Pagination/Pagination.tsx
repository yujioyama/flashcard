import clsx from 'clsx'
import { MouseEvent } from 'react'
import styles from './Pagination.module.scss'

type Props = {
  totalCount: number
  onClick: (e: MouseEvent<HTMLElement>) => void
  currentPage: number
}

const Pagination: React.FC<Props> = ({ totalCount, onClick, currentPage }: Props) => {
  const PER_PAGE = 10

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  const isCurrent = (index: number) => currentPage === index

  return (
    <ol className={styles.list}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={styles.item}>
          <button
            type='button'
            className={clsx(styles.link, isCurrent(index) && styles.isCurrent)}
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

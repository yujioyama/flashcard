import styles from './List.module.scss'

type Props = {
  children: ReactNode
  onModalOpen: () => voidå
}

const List: React.FC<Props> = ({ children, onModalOpen }) => {
  return (
    <ul className={styles.list} onClick={onModalOpen}>
      {children}
    </ul>
  )
}

export default List

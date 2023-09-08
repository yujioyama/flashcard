import Modal from '../Modal/Modal'
import styles from './ListItem.module.scss'

type Props = {
  word: string
}

const ListItem: React.FC<Props> = ({ word }) => {
  return (
    <li className={styles.item}>
      <button className={styles.link}>{word}</button>
      <Modal title={word} onClose>
        テスト
      </Modal>
    </li>
  )
}

export default ListItem

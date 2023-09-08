import Modal from '../Modal/Modal'
import styles from './ListItem.module.scss'

type Props = {
  word: string
  onClose: () => void
  selectedModal: string
}

const ListItem: React.FC<Props> = ({ word, onClose, selectedModal }) => {
  return (
    <li className={styles.item}>
      <button className={styles.link} data-modal={word}>
        {word}
      </button>
      <Modal title={word} onClose={onClose} isOpen={selectedModal === word}>
        テスト
      </Modal>
    </li>
  )
}

export default ListItem

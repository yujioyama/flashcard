import { ChangeEvent } from 'react'
import styles from './InputText.module.scss'

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  newWord: string
}

const InputText: React.FC<Props> = ({ onChange, newWord }) => {
  return (
    <div className={styles.inputWrapper}>
      <input type='text' value={newWord} className={styles.input} onChange={onChange} />
    </div>
  )
}

export default InputText

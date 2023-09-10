import styles from './InputText.module.scss'

type Props = {
  onChange: () => void
  newWord: string
}

const InputText = ({ onChange, newWord }) => {
  return (
    <div className={styles.inputWrapper}>
      <input type='text' value={newWord} className={styles.input} onChange={onChange} />
    </div>
  )
}

export default InputText

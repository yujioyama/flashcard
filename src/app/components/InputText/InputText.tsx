import styles from './InputText.module.scss'

const InputText = () => {
  return (
    <div className={styles.inputWrapper}>
      <input type='text' className={styles.input} />
    </div>
  )
}

export default InputText

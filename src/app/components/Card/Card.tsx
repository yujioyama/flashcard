import styles from './Card.module.scss'

const Card: React.FC<Word> = (word) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const { word: wordSpelling, phonetics, meanings } = word

  return (
    <li className={styles.card} onClick={handleFlip}>
      <div className={clsx(styles.cardInner, styles.front, isFlipped && styles.isFlipped)}>
        <p>{wordSpelling}</p>
        {phonetics.map(
          (pronunciation, index) =>
            pronunciation && (
              <p
                onClick={() => handlePronunciation(pronunciation.audio)}
                key={`${pronunciation.audio}_${String(index)}`}
              >
                発音
              </p>
            ),
        )}
      </div>

      <div className={clsx(styles.cardInner, styles.back, isFlipped && styles.isFlipped)}>
        {meanings.map((meaning, index) => (
          <div key={`${meaning.definitions[0].definition}_meanings_${String(index)}`}>
            <p key={meaning.partOfSpeech}>{meaning.partOfSpeech}</p>
            {meaning.definitions.map((definition, index) => {
              const { definition: definitionDesc, example } = definition

              return (
                <div key={`${definitionDesc}_definition_${String(index)}`}>
                  <p>意味：{definitionDesc}</p>
                  {example && <p key={example}>例文：{example}</p>}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </li>
  )
}

export default Card

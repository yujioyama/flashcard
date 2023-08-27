"use client";
import styles from "./page.module.css";
import { FormEventHandler, useState } from "react";
import axios, { AxiosResponse } from "axios";
import type { Word } from "../../types/word";
import clsx from "clsx";

export default function Home() {
  const [newWord, setNewWord] = useState<string>("");
  const [wordList, setWordList] = useState<Word[]>([]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response: AxiosResponse<Word[]> = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
    );

    const [word] = response.data;

    setWordList([...wordList, word]);
  };

  const handlePronunciation = (pronunciation: string) => {
    const audio = new Audio(pronunciation);
    audio
      .play()
      .then(() => {
        console.log("Audio started!");
      })
      .catch((error) => console.warn(error));
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <p>単語・イディオムを追加</p>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <button>追加</button>
      </form>

      <ul className={styles.list}>
        {wordList.map((word) => (
          <li key={word.word} className={styles.card}>
            <div className={clsx(styles.cardInner, styles.front)}>
              <p>{word.word}</p>
              {word.phonetics.map((pronunciation, index) => (
                <p
                  onClick={() => handlePronunciation(pronunciation.audio)}
                  key={pronunciation.audio}
                >
                  発音
                </p>
              ))}
            </div>

            <div className={clsx(styles.cardInner, styles.back)}>
              {word.meanings.map((meaning) => (
                <>
                  <p key={meaning.partOfSpeech}>{meaning.partOfSpeech}</p>
                  {meaning.definitions.map((definition, index) => {
                    const { definition: definitionDesc, example } = definition;

                    return (
                      <>
                        <p key={definitionDesc}>意味：{definitionDesc}</p>
                        {example && <p key={example}>例文：{example}</p>}
                      </>
                    );
                  })}
                </>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

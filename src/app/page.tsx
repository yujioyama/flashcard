"use client";
import styles from "./page.module.css";
import { FormEventHandler, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Word } from "../../types/word";

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
            <p>{word.word}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

'use client'
import axios, { AxiosResponse } from 'axios'
import clsx from 'clsx'
import { NextResponse } from 'next/server'
import { FormEventHandler, useState, use, useEffect } from 'react'
import type { Word } from './types/word'
import CardList from '../app/components/CardList/CardList'

export default function Home() {
  const [newWord, setNewWord] = useState<string>('')
  const [words, setWords] = useState<Word[]>([])

  const BASE_URL = 'http://localhost:8000'

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch(`${BASE_URL}/words`)

        const data = await res.json()

        setWords(data)
      } catch {
        alert('There was an error loading')
      }
    }
    fetchWords()
  }, [])

  async function createWord(newWord) {
    try {
      const res = await fetch(`${BASE_URL}/words`, {
        method: 'POST',
        body: JSON.stringify(newWord),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      setWords((words) => [...words, data])
    } catch {
      alert('There was an error loading')
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const response: AxiosResponse<Word[]> = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
    )

    const [word] = response.data

    if (words.some((e) => e.word === word.word)) return

    await createWord(word)

    setWords([...words, word])

    setNewWord('')
  }

  const handleDeleteWord = async (id) => {
    console.log(id)
    try {
      await fetch(`${BASE_URL}/words/${String(id)}`, {
        method: 'DELETE',
      })

      setWords((words) => words.filter((word) => word.id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <p>単語・イディオムを追加</p>
        <input type='text' value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        <button>追加</button>
      </form>

      <CardList words={words} onDeleteWord={handleDeleteWord} />
    </main>
  )
}

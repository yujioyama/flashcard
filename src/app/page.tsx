'use client'
import axios, { AxiosResponse } from 'axios'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import ActionButton from './components/ActionButton/ActionButton'
import ExecuteButton from './components/ExecuteButton/ExecuteButton'
import Heading from './components/Heading/Heading'
import InputText from './components/InputText/InputText'
import List from './components/List/List'
import ListItem from './components/ListItem/ListItem'
import Main from './components/Main/Main'
import MainInner from './components/MainInner/MainInner'
import Modal from './components/Modal/Modal'
import styles from './page.module.scss'

const Home = () => {
  const [selectedModal, setSelectedModal] = useState<string>('')
  const [words, setWords] = useState<Word[]>([])
  const [newWord, setNewWord] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

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

  const handleModalOpen = (event) => {
    event.preventDefault()

    const {
      target: {
        dataset: { modal },
      },
    } = event
    if (modal) setSelectedModal(modal)
  }

  const handleModalClose = () => setSelectedModal('')

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

  const handleChange = (event) => {
    setNewWord(event.target.value)
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
    setSelectedModal('')
  }

  const handleSwitchEdit = (event) => {
    event.preventDefault()
    setIsEditing(!isEditing)
  }

  return (
    <Main>
      <div className={styles.headingBox}>
        <Heading>単語リスト</Heading>

        <div className={styles.actionBox}>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isEdit' onSwitchEdit={handleSwitchEdit} isEditing={isEditing}>
              編集
            </ActionButton>
          </div>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isAdd' onClick={handleModalOpen} dataModal='add'>
              追加
            </ActionButton>
            <Modal
              isOpen={selectedModal === 'add'}
              onClose={handleModalClose}
              title='新しく単語を追加する'
            >
              <form className={styles.row} onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <InputText onChange={handleChange} newWord={newWord} />
                </div>
                <ExecuteButton>追加</ExecuteButton>
              </form>
            </Modal>
          </div>
        </div>
      </div>

      <MainInner>
        <List onModalOpen={handleModalOpen}>
          {words.map((word) => (
            <ListItem
              isEditing={isEditing}
              onModalOpen={handleModalOpen}
              word={word}
              key={word.id}
              onClose={handleModalClose}
              selectedModal={selectedModal}
            />
          ))}
        </List>

        <div className={styles.buttonBox}>
          <a href='' className={styles.button}>
            テストを開始する
          </a>
        </div>
      </MainInner>
    </Main>
  )
}

export default Home

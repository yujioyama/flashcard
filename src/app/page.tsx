'use client'
import axios, { AxiosResponse } from 'axios'
import { useState, useEffect, MouseEvent, FormEvent, ChangeEvent } from 'react'
import ActionButton from './components/ActionButton/ActionButton'
import DefinitionList from './components/DefinitionList/DefinitionList'
import ExecuteButton from './components/ExecuteButton/ExecuteButton'
import Heading from './components/Heading/Heading'
import InputText from './components/InputText/InputText'
import List from './components/List/List'
import ListItem from './components/ListItem/ListItem'
import Main from './components/Main/Main'
import MainInner from './components/MainInner/MainInner'
import Modal from './components/Modal/Modal'
import useBodyFixed from './hooks/useBodyFixed'
import styles from './page.module.scss'
import type { Word } from './types/word'

const Home = () => {
  const [selectedModal, setSelectedModal] = useState<string>('')
  const [words, setWords] = useState<Word[]>([])
  const [newWord, setNewWord] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [modalWord, setModalWord] = useState<Word>()

  const { setBodyFixed } = useBodyFixed()

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

  const handleModalOpen = (event: MouseEvent<HTMLButtonElement>, word: Word) => {
    event.preventDefault()

    setModalWord(word)

    const {
      currentTarget: {
        dataset: { modal },
      },
    } = event
    if (modal) {
      setBodyFixed(true)
      setSelectedModal(modal)
    }
  }

  const handleModalClose = () => {
    setBodyFixed(false)
    setSelectedModal('')
  }

  async function createWord(newWord: Word) {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewWord(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  const handleSwitchEdit = (event: MouseEvent) => {
    event.preventDefault()
    setIsEditing(!isEditing)
  }

  return (
    <Main>
      <div className={styles.headingBox}>
        <Heading>単語リスト</Heading>

        <div className={styles.actionBox}>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isEdit' onClick={handleSwitchEdit} isEditing={isEditing}>
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
        <List>
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

        {modalWord && (
          <Modal
            title={modalWord.word}
            onClose={handleModalClose}
            isOpen={selectedModal === 'modal-definition'}
          >
            <DefinitionList word={modalWord} />
          </Modal>
        )}

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

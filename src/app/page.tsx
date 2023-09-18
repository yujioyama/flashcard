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
import { useBodyFixed } from './hooks/useBodyFixed'
import styles from './page.module.scss'
import type { Word } from './types/word'

const Home = () => {
  const [selectedModal, setSelectedModal] = useState<string>('')
  const [words, setWords] = useState<Word[]>([])
  const [newWord, setNewWord] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [modalWord, setModalWord] = useState<Word>()

  const { setBodyFixed } = useBodyFixed()

  const BASE_URL = 'http://localhost:8000/words'

  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch(`${BASE_URL}`)

        const data = await res.json()

        setWords(data)
      } catch {
        alert('There was an error loading')
      }
    }
    fetchWords()
  }, [])

  async function createWord(newWord: Word) {
    try {
      const { data } = await axios.post(`${BASE_URL}`, newWord)

      setWords((words) => [...words, data])
    } catch {
      alert('There was an error loading')
    }
  }

  async function deleteWord(id: number) {
    try {
      await axios.delete(`${BASE_URL}/${id}`)

      setWords((words) => words.filter((word) => word.id !== id))
    } catch {
      alert('There was an error deleting')
    }
  }

  async function updateWord(id: number) {
    try {
      const response: AxiosResponse<Word[]> = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
      )

      const [updatingWord] = response.data

      await axios.put(`${BASE_URL}/${id}`, updatingWord)

      setWords((words) => {
        return words.map((savedWord) => {
          if (savedWord.id === id) {
            return updatingWord
          } else {
            return savedWord
          }
        })
      })
    } catch {
      alert('There was an error updating the word')
    }
  }

  const handleModalOpen = (event: MouseEvent<HTMLButtonElement>, word: Word) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBodyFixed(false)
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

  const handleDelete = async (id: number) => {
    await deleteWord(id)
    handleModalClose()
  }

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    modalWord && (await updateWord(modalWord.id))

    setNewWord('')
    handleModalClose()
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

                <div className={styles.addButton}>
                  <ExecuteButton>追加</ExecuteButton>
                </div>
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
              key={String(word.id)}
              onClose={handleModalClose}
              selectedModal={selectedModal}
            />
          ))}
        </List>

        {modalWord && (
          <>
            <Modal
              title={modalWord.word}
              onClose={handleModalClose}
              isOpen={selectedModal === 'modal-definition'}
            >
              <DefinitionList word={modalWord} />
            </Modal>

            <Modal
              title='単語を変更する'
              onClose={handleModalClose}
              isOpen={selectedModal === 'modal-edit'}
            >
              <form className={styles.row} onSubmit={handleUpdate}>
                <div className={styles.input}>
                  <InputText onChange={handleChange} newWord={newWord} />
                </div>

                <div className={styles.addButton}>
                  <ExecuteButton>変更</ExecuteButton>
                </div>
              </form>
            </Modal>

            <Modal
              title='単語を削除する'
              onClose={handleModalClose}
              isOpen={selectedModal === 'modal-delete'}
            >
              <p className={styles.deleteMessage}>{modalWord.word}を削除してよろしいですか？</p>
              <div className={styles.deleteButton}>
                <ExecuteButton color='warning' onClick={() => handleDelete(modalWord.id)}>
                  削除
                </ExecuteButton>
              </div>
            </Modal>
          </>
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

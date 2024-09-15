'use client'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState, MouseEvent, FormEvent, ChangeEvent, useRef } from 'react'
import ActionButton from './components/ActionButton/ActionButton'
import Button from './components/Button/Button'
import ButtonBox from './components/ButtonBox/ButtonBox'
import DefinitionList from './components/DefinitionList/DefinitionList'
import ExecuteButton from './components/ExecuteButton/ExecuteButton'
import InputText from './components/InputText/InputText'
import List from './components/List/List'
import ListItem from './components/ListItem/ListItem'
import Main from './components/Main/Main'
import MainInner from './components/MainInner/MainInner'
import Modal from './components/Modal/Modal'
import Pagination from './components/Pagination/Pagination'
import { WORDS_API_PATH } from './config'
import { useBodyFixed } from './hooks/useBodyFixed'
import styles from './page.module.scss'
import type { WordType } from '@/types/word'

const Home = () => {
  const [selectedModal, setSelectedModal] = useState<string>('')
  const [newWord, setNewWord] = useState<string>('')
  const [words, setWords] = useState<WordType[]>([])
  const [modalWord, setModalWord] = useState<WordType>()
  const [selectedDeleteWordIds, setSelectedDeleteWordIds] = useState<number[]>([])
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const submitProcessing = useRef(false)
  const [totalCount, setTotalCount] = useState(0)

  async function fetchData(from: number, to: number) {
    try {
      const {
        data: { wordData, count },
      }: AxiosResponse<{
        wordData: WordType[]
        count: number
      }> = await axios.get(WORDS_API_PATH, {
        params: { from, to },
      })

      setWords(wordData)
      setTotalCount(count)
    } catch (error) {
      console.error('There was an error fetching words:', error)
    }
  }

  useEffect(() => {
    void fetchData(0, 9)
  }, [])

  const { setBodyFixed } = useBodyFixed()

  async function createWord(newWord: WordType) {
    try {
      await axios.post(WORDS_API_PATH, newWord)

      void fetchData(currentPage, currentPage + 9)
    } catch {
      alert('failed at adding the word')
    }
  }

  async function deleteWord(id: number) {
    try {
      await axios.delete(`${WORDS_API_PATH}?id=${String(id)}`)

      setSelectedDeleteWordIds([])
      void fetchData(currentPage, currentPage + 9)
    } catch {
      alert('could not delete the word')
    }
  }

  const handleModalOpen = (event: MouseEvent<HTMLButtonElement>, word: WordType) => {
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

    if (submitProcessing.current) return

    if (words.some((e) => e.word === newWord)) {
      alert('this word is already registered')
      setNewWord('')
      return
    }

    submitProcessing.current = true

    try {
      const response: AxiosResponse<WordType[]> = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`,
      )

      const [word] = response.data

      await createWord(word)

      setNewWord('')
      setSelectedModal('')
    } catch (error: any) {
      // eslint-disable-next-line
      if (error.code === 'ERR_NETWORK') {
        alert(`Your internet connection is not stable.`)
      }
      // eslint-disable-next-line
      if (error.response.status === 404) {
        alert('could not find the word')
        return
      }
    } finally {
      submitProcessing.current = false
      setNewWord('')
    }
  }

  const handleDelete = async () => {
    for (const selectedDeleteWordId of selectedDeleteWordIds) {
      await deleteWord(selectedDeleteWordId)
    }

    setIsDeleteButtonDisabled(true)
  }

  const handleSelectDeleteWord = (id: number) => {
    if (selectedDeleteWordIds.some((selectedDeleteWordId) => selectedDeleteWordId === id)) {
      const newFilteredDeleteWordIds = selectedDeleteWordIds.filter(
        (selectedDeleteWordId) => selectedDeleteWordId !== id,
      )

      setSelectedDeleteWordIds(newFilteredDeleteWordIds)

      if (newFilteredDeleteWordIds.length === 0) {
        setIsDeleteButtonDisabled(true)
      }
    } else {
      const newSelectedDeleteWordIds = [...selectedDeleteWordIds, id]
      setSelectedDeleteWordIds(newSelectedDeleteWordIds)

      if (newSelectedDeleteWordIds.length > 0) {
        setIsDeleteButtonDisabled(false)
      }
    }
  }

  const handlePagination = (e: MouseEvent<HTMLElement>) => {
    const pageNumber = Number(e.currentTarget.getAttribute('data-page-number'))

    const getFromAndTo = () => {
      const ITEM_PER_PAGE = 10
      const from = pageNumber * ITEM_PER_PAGE
      const to = from + ITEM_PER_PAGE - 1

      return { from, to }
    }

    const { from, to } = getFromAndTo()

    setCurrentPage(pageNumber)

    void fetchData(from, to)
  }

  return (
    <Main>
      <div className={styles.actionBox}>
        <div className={styles.actionBoxButton}>
          <ActionButton type='isAdd' onClick={handleModalOpen} dataModal='add'>
            追加
          </ActionButton>
          <Modal isOpen={selectedModal === 'add'} onClose={handleModalClose} title='add a new word'>
            <form className={styles.row} onSubmit={handleSubmit}>
              <div className={styles.input}>
                <InputText onChange={handleChange} newWord={newWord} />
              </div>

              <div className={styles.addButton}>
                <ExecuteButton>add</ExecuteButton>
              </div>
            </form>
          </Modal>
        </div>
        <div className={styles.actionBoxButton}>
          <ActionButton type='isDelete' onClick={handleDelete} isDisabled={isDeleteButtonDisabled}>
            削除
          </ActionButton>
        </div>
      </div>

      <MainInner>
        <List>
          {words.map((word) => (
            <ListItem
              onModalOpen={handleModalOpen}
              word={word}
              key={String(word.id)}
              onClose={handleModalClose}
              onSelectDeleteWord={handleSelectDeleteWord}
            />
          ))}
        </List>

        <Pagination totalCount={totalCount} onClick={handlePagination} currentPage={currentPage} />

        {modalWord && (
          <Modal
            title={modalWord.word}
            onClose={handleModalClose}
            isOpen={selectedModal === 'modal-definition'}
          >
            <DefinitionList word={modalWord} />
          </Modal>
        )}

        {words.length > 0 ? (
          <ButtonBox>
            <Button href='/test'>start testing</Button>
          </ButtonBox>
        ) : (
          <p className={styles.noWordsText}>No words added yet.</p>
        )}
      </MainInner>
    </Main>
  )
}

export default Home

'use client'
import clsx from 'clsx'
import { useState } from 'react'
import ActionButton from './components/ActionButton/ActionButton'
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

  return (
    <Main>
      <div className={styles.headingBox}>
        <Heading>単語リスト</Heading>

        <div className={styles.actionBox}>
          <div className={styles.actionBoxButton}>
            <ActionButton type='isEdit'>編集</ActionButton>
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
              <div className={styles.row}>
                <div className={styles.input}>
                  <InputText />
                </div>
                <button className={styles.add}>追加</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      <MainInner>
        <List onModalOpen={handleModalOpen}>
          {['apple', 'banana', 'cherry'].map((item, index) => (
            <ListItem
              onModalOpen={handleModalOpen}
              word={item}
              key={index}
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

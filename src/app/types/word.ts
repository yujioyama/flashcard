import { Word, Definitions, Meanings, Phonetics } from './schema'

export type WordType = Word & {
  phonetics: {
    text: Phonetics['text']
    audio: Phonetics['audio']
  }[]
  meanings: {
    partOfSpeech: Meanings['partOfSpeech']
    definitions: Omit<Definitions, 'id' | 'meaning_id'>[]
  }[]
}

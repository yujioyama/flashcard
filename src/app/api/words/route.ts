import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import type { WordType } from '@/types/word'

const wordsJson = 'http://xd711843.php.xdomain.jp/root'

export async function GET() {
  try {
    const { data: words } = await axios.get(wordsJson)

    return NextResponse.json(words)
  } catch (error) {
    console.log(error)
    console.error('単語データの読み込みに失敗しました。')
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = (await request.json()) as WordType

    const { data: wordData } = await supabase
      .from('word')
      .insert({
        word: response.word,
        phonetic: response.phonetic,
        origin: response.origin,
      })
      .select()

    if (!wordData) return

    const word = wordData[0]

    for (const phonetic of response.phonetics) {
      try {
        await supabase
          .from('phonetics')
          .insert({
            word_id: word.id,
            audio: phonetic.audio,
            text: phonetic.text,
          })
          .select()
      } catch (error) {
        console.log(error)
      }
    }

    for (const meanings of response.meanings) {
      try {
        const { data: meaningsData } = await supabase
          .from('meanings')
          .insert({
            word_id: word.id,
            partOfSpeech: meanings.partOfSpeech,
          })
          .select()

        if (!meaningsData) return

        const meaning = meaningsData[0]

        for (const definition of meanings.definitions) {
          await supabase
            .from('definitions')
            .insert({
              meaning_id: meaning.id,
              definition: definition.definition,
              example: definition.example,
              synonyms: definition.synonyms,
              antonyms: definition.antonyms,
            })
            .select()
        }
      } catch (error) {
        console.log(error)
      }
    }

    return NextResponse.json({ ...word, ...response.phonetics, ...response.meanings })
  } catch (error) {
    console.error(error)
    console.error('failed at adding the word in route')
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // await request.json()がエラーになってしまうので、idをクエリパラメーターから取得
    // next13の問題のよう
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) throw new Error('there is no id')

    await supabase.from('word').delete().eq('id', id)

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(error)
  }
}

import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import type { WordType } from '@/types/word'

export async function GET(request: NextRequest) {
  const from = Number(request.nextUrl.searchParams.get('from'))
  const to = Number(request.nextUrl.searchParams.get('to'))

  try {
    const { data: wordData, count } = await supabase
      .from('word')
      .select(
        `
      *,
      phonetics (
        text,
        audio
      ),
      meanings (
        partOfSpeech,
        definitions (
          definition,
          example,
          synonyms,
          antonyms
        )
      )
    `,
        { count: 'exact' },
      )
      .range(from, to)

    console.log(wordData)

    if (wordData === null) return

    return NextResponse.json({ wordData, count })
  } catch (error) {
    console.error('There was an error fetching words:', error)
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

    return NextResponse.json({
      ...word,
      phonetics: response.phonetics,
      meanings: response.meanings,
    })
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

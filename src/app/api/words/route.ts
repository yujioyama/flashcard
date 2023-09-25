import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import type { Word } from '@/types/word'

const wordsFile = path.join(process.cwd(), '/data/words.json')

const readWordsFile = async (): Promise<Word[]> => JSON.parse(await fs.readFile(wordsFile, 'utf8'))

export async function GET() {
  try {
    const words = await readWordsFile()

    return NextResponse.json(words)
  } catch {
    console.error('Failed to read words file')
  }
}

export async function POST(request: NextRequest) {
  try {
    const words = await readWordsFile()

    const response = await request.json()

    const wordsWithNewWordIncluded = [...words, response]

    await fs.writeFile(wordsFile, JSON.stringify(wordsWithNewWordIncluded))

    return NextResponse.json(response)
  } catch {
    console.error('Failed to write words file')
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // await request.json()がエラーになってしまうので、idをクエリパラメーターから取得
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const words = await readWordsFile()

    const wordsAfterDeletion = words.filter((word) => word.id !== Number(id))

    await fs.writeFile(wordsFile, JSON.stringify(wordsAfterDeletion))

    return NextResponse.json(wordsAfterDeletion)
  } catch {
    console.error('Failed to deleting a word from the file')
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const words = await readWordsFile()

    const { overwritingWord, id } = await request.json()

    const oldWord = words.find((word) => word.id === id)

    const wordsAfterUpdate = words.map((word) => {
      if (word.id === id) {
        // 無理やりアサーションでWord型に指定
        return {
          id: oldWord?.id,
          ...overwritingWord,
        } as Word
      } else {
        return word
      }
    })

    await fs.writeFile(wordsFile, JSON.stringify(wordsAfterUpdate))

    return NextResponse.json(wordsAfterUpdate)
  } catch {
    console.error('Failed to updating a word from the file')
  }
}

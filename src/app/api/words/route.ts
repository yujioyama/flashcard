import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

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
    const response = await request.json()

    const { data: createdWord } = await axios.post(wordsJson, response)

    return NextResponse.json(createdWord)
  } catch (error) {
    console.error(error)
    console.error('単語データの書き込みに失敗しました。')
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // await request.json()がエラーになってしまうので、idをクエリパラメーターから取得
    // next13の問題のよう
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    await axios.delete(`${wordsJson}/${id}`)

    // 何かreturnしないと500エラーになるため、とりあえずstatus:200を返す
    return NextResponse.json({ status: 200 })
  } catch {
    console.error('単語データの削除に失敗しました。')
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, overwritingWord } = await request.json()

    await axios.put(`${wordsJson}/${id}`, overwritingWord)

    return NextResponse.json({ status: 200 })
  } catch {
    console.error('単語データの更新に失敗しました。')
  }
}

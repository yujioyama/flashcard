import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request) {
  const words = await prisma.word.findMany({
    include: {
      phonetics: true,
      meanings: {
        include: {
          definitions: true,
        },
      },
    },
  })
  return NextResponse.json({ words })
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const word = await prisma.word.create({
      data: json,
    })

    return new NextResponse(JSON.stringify(word), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new NextResponse('エラー', {
        status: 409,
      })
    }

    return new NextResponse('エラー500', {
      status: 500,
    })
  }
}

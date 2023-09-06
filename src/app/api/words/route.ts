import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
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

export async function POST(request: NextRequest) {
  const data = await request.json()

  const word = await prisma.word.create({
    data,
  })
  return NextResponse.json({ word })
}

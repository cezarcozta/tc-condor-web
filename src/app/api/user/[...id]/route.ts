import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma';

export async function PUT(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const id = path.split('/')[3];

  const user = await prisma.user.findUnique({ where: { id: Number(id) } })
  console.log({ id })
  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }
  const body = await request.json();
  console.log({ body })
  const profile = body.profile;
  const updatedUser = await prisma.user.update({ where: { id: Number(id) }, data: { role: profile } })

  return NextResponse.json({ updatedUser })
}
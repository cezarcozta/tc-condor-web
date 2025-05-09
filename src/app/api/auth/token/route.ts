import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const getCookies = await cookies();
  const cookie = getCookies.get('next-auth.session-token');
  const value = cookie?.value || ''

  return NextResponse.json(value)
}
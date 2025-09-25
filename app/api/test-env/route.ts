// app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('process.env.GOOGLE_CLIENT_ID',process.env.GOOGLE_CLIENT_ID)
  return NextResponse.json({
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
  });
}
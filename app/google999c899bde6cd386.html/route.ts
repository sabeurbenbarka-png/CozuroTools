import { NextResponse } from 'next/server';

export async function GET() {
  const fileContent = 'google-site-verification: google999c899bde6cd386.html';
  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

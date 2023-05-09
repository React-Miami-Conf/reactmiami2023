import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export default async function upload(request: NextRequest) {
  const { url } = await put('image.jpeg', request.body, { access: 'public', contentType: 'image/jpeg'});

  return NextResponse.json({ url });
}
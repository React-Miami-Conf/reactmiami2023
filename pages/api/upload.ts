import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const config = { runtime: 'edge' };

export default async function upload(request: NextRequest) {
  const form = await request.formData();

  const file = form.get('file') as File;

  const blob = await put(file.name, file, { access: 'public'});

  const imageData = {...blob, description: form.get('description')}

  return NextResponse.json(imageData);
}
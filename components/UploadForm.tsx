import type { BlobResult } from '@vercel/blob';
import { useState } from 'react';
import {NextResponse} from "next/server";

export default function UploadForm() {
  const [blob, setBlob] = useState<BlobResult | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");

  async function storeData(freshBlob) {
    const response = await fetch(`/api/store`, {
      method: 'POST',
      body: JSON.stringify(freshBlob)
    });

    const image = await response.json()
    return NextResponse.json(image)
  }

  return (
    <>
      <form
        action="/api/upload"
        method="POST"
        encType="multipart/form-data"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const freshBlob = (await response.json()) as BlobResult;

          await setBlob(freshBlob);

          await storeData(freshBlob)

        }}
      >
        <input type="file" name="file" className="text-white/80" />
        <button type="submit" className="text-white/100">Upload</button>
        <input
          className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
          placeholder="Alt text"
          id="description"
          name="description"
          type="text"
          value={currentDescription}
          onChange={(e) => setCurrentDescription(e.target.value)}
          autoComplete="off"
        />
        <input
          className="border rounded shadow-sm px-3 py-2 w-full outline-black focus:outline-2 focus:outline"
          placeholder="Category"
          id="category"
          name="category"
          type="text"
          value={currentCategory}
          onChange={(e) => setCurrentCategory(e.target.value)}
          autoComplete="off"
        />
      </form>
      <br/>
      {blob && (
        <div className="text-white/80">
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
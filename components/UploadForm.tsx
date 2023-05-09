import type { PutBlobResult } from '@vercel/blob';
import { useState } from 'react';

export default function UploadForm() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  return (
    <>
      <form
        action="/api/blob"
        method="POST"
        encType="multipart/form-data"
        className="text-white/80"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const response = await fetch('/api/blob', {
            method: 'POST',
            body: formData,
          });
          const blob = (await response.json()) as PutBlobResult;
          setBlob(blob);
        }}
      >
        <input type="file" name="file" className="text-white/80" />
        <button type="submit" className="text-white/100">Upload</button>
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
"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-700 p-6">

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && (
        <p className="text-green-500">
          Selected: {file.name}
        </p>
      )}

    </div>
  );
}
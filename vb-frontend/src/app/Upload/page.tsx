"use client";
import { useRef, useState } from "react";

export default function UploadSection() {
  const [fileSelected, setFileSelected] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileSelected(true);
    }
  };

  return (
    <main className="center">
      <div>
        <h1>Upload Video</h1>
      </div>
      <div className="uploadBox" onClick={handleClick}>
        {!fileSelected && (
          <>
            <img src="upload.png" width={200} height={200} alt="Upload Icon" />
            <h2>Click to upload files</h2>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={fileSelected ? "visible" : "hidden"}
        />
      </div>
      <div>
        <button className="upload-button" type="submit">Upload</button>
      </div>
    </main>
  );
}

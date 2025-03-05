"use client";
import { useRef, useState } from "react";

const API_BASE_URL = 'https://vidbox-backend-7u1k.onrender.com/';

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Select a file to upload.");
      return;
    }

    if (title == "") {
      setMessage("Must Include Title");
      return;
    }
  

  const formData = new FormData();
  formData.append("video", file);
  formData.append("title", title);

  setUploading(true);
  setMessage("");

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setMessage("Upload successful!");
      setFile(null);
      setTitle("");
    } else {
      const errorData = await response.json();
      setMessage(`Upload failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    setMessage("Error uploading file. Please try again.");
  } finally {
    setUploading(false);
  }
};

  return (
    <main className="upload-page">
      <div>
        <h1>Upload Video</h1>
      </div>
      <form id="uploadForm" onSubmit={handleUpload}>
        <div className="uploadBox" onClick={handleClick}>
          {!file && (
            <>
              <img src="upload.png" width={200} height={200} alt="Upload Icon" />
              <h2>Click to upload files</h2>
            </>
          )}
          <input
            type="file"
            id="fileUpload"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className={file ? "visible" : "hidden"}
          />
        </div>
        <div>
          <label>Title: </label>
          <input type="text" id="videoTitle" onChange={handleTitleChange}></input>
          <button type="submit" id="upload-button">{uploading ? "Uploading..." : "Upload"}</button>
        </div>
        {message && <div style={{ color: 'red', margin: "5px"}}>{message}</div>}
      </form>
    </main>
  );
}

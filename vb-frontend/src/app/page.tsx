"use client"
import styles from "./page.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = 'https://vidbox-backend-7u1k.onrender.com/';

interface Video {
  _id: string;
  title: string;
  googleDriveLink: string;
  userID: string;
  postTime: string;
}

const videoIds = ['67cc2a5ba3511970b4566ff4', '67c9d72e7996e024548e6652', '67cc2d15a3511970b4566ff6']

export default function Home() {

  const [videos, setVideos] = useState<Video[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await Promise.all(
          videoIds.map(async (id) => {
            const response = await fetch(`${API_BASE_URL}video/${id}`);
            if (!response.ok) {
              throw new Error(`Video with ID "${id}" not found`);
            }
            return await response.json();
          })
        );
        setVideos(fetchedVideos);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchVideos();
  }, []);

  if (errorMessage) return <div>Error: {errorMessage}</div>
  if (!videos) return <div>Loading Video...</div>

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <Link href={`/Video/${video._id}`} passHref key={video._id}>
        <div className="video" style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px" }}>
          <img src="/vercel.svg" alt="Thumbnail" width="50%" />
        </div>
          <h3>{video.title}</h3>
          <h4>Uploaded: {new Date(video.postTime).toLocaleDateString()}</h4>
      </Link>
      ))} 
    </div>
  );
}

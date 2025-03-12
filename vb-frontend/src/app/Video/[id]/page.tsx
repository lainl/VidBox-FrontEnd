'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_BASE_URL = 'https://vidbox-backend-7u1k.onrender.com/';

interface Video {
  _id: string;
  title: string;
  //googleDriveLink: string;
  //userID: string;
  postTime: string;
}

export default function VideoDisplay() {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
       const fetchVideo = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}video/${id}`);
          if (!response.ok)
          {
            throw new Error(`Video with ID "${id}" not found`);
          }
          const contentType = response.headers.get("content-type");

          if (!contentType || !contentType.includes("application/json")) {
            throw new Error(`Unexpected response format: ${contentType}`);
          }

          const data = await response.json();

          setVideo(data);

        } catch (error : any) {
          setErrorMessage(error.message);
        }
      };
       fetchVideo();
    }, [id]);

  if (errorMessage) return <div>Error: {errorMessage}</div>
  if (!video) return <div>Loading video...</div>;

  return (
    <div className="video-container">
      <div className="display-video">
        <video controls>
        <source src={`${API_BASE_URL}video/stream/${id}`} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
      <div className="display-text">
      <h1>{video.title}</h1>
      <h1>Uploaded: {new Date(video.postTime).toLocaleDateString()}</h1>
      </div>
    </div>
  );
}
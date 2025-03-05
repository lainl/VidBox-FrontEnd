"use client"
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const API_BASE_URL = 'https://vidbox-backend-7u1k.onrender.com/';

interface Video {
  id: number;
  title: string;
  duration: string;
  postDate: string;
  videoURL: string;
}

const VideoCard: React.FC<Video> = ({ id, title, duration, postDate, videoURL }) => {
  return (
    <div>
      <div className="video">
        <img src="vercel.svg" alt="Thumbnail" width="50%" />
      </div>
      <div>
        <h3>{title}</h3>
        <h4>{duration} : {postDate}</h4>
      </div>
    </div>
  );
};

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchedVideos = [
      { id: 1, title: "Video 1", duration: "5:00", postDate: "1 day ago", videoURL: "video1.mp4" },
      { id: 2, title: "Video 2", duration: "10:43", postDate: "12 hours ago", videoURL: "video2.mp4" },
      { id: 3, title: "Video 3", duration: "1:05:03", postDate: " 01/12/23", videoURL: "video3.mp4" },
      { id: 4, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 5, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
    ];
    setVideos(fetchedVideos);
    //  const fetchVideos = async () => {
    //   try {
    //     const response = await fetch(API_BASE_URL);
    //     const data = await response.json();
    //     setVideos(data);
    //   } catch (error) {
    //     console.error("Error fetching videos:", error);
    //   }
    //};

    //fetchVideos();
  }, []);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} id={video.id} title={video.title} duration={video.duration} postDate={video.postDate} videoURL={video.videoURL} />
      ))}
    </div>
  );
}

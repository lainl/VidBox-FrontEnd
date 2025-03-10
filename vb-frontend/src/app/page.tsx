"use client"
import styles from "./page.module.css";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

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

  const videoLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleVideoClicked = () =>
    {
      videoLinkRef.current?.click();
    }

  useEffect(() => {
    const fetchedVideos = [
      { id: 1, title: "Video 1", duration: "5:00", postDate: "1 day ago", videoURL: "video1.mp4" },
      { id: 2, title: "Video 2", duration: "10:43", postDate: "12 hours ago", videoURL: "video2.mp4" },
      { id: 3, title: "Video 3", duration: "1:05:03", postDate: " 01/12/23", videoURL: "video3.mp4" },
      { id: 4, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 5, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 6, title: "Video 1", duration: "5:00", postDate: "1 day ago", videoURL: "video1.mp4" },
      { id: 7, title: "Video 2", duration: "10:43", postDate: "12 hours ago", videoURL: "video2.mp4" },
      { id: 8, title: "Video 3", duration: "1:05:03", postDate: " 01/12/23", videoURL: "video3.mp4" },
      { id: 9, title: "Testing Really long video title juset because", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 10, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 11, title: "Video 1", duration: "5:00", postDate: "1 day ago", videoURL: "video1.mp4" },
      { id: 12, title: "Video 2", duration: "10:43", postDate: "12 hours ago", videoURL: "video2.mp4" },
      { id: 13, title: "Video 3", duration: "1:05:03", postDate: " 01/12/23", videoURL: "video3.mp4" },
      { id: 14, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
      { id: 15, title: "Video 4", duration: "05:59", postDate: " 01/13/25", videoURL: "video4.mp4" },
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
    // };

    // fetchVideos();
  }, []);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div  key={video.id} style={{cursor: "pointer"}} onClick={handleVideoClicked}>
        <VideoCard id={video.id} title={video.title} duration={video.duration} postDate={video.postDate} videoURL={video.videoURL} />
        <a href="/Video" style={{display: "hidden"}} ref={videoLinkRef}></a>
        </div>
      ))}
    </div>
  );
}

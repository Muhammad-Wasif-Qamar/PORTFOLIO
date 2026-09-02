"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface Section {
  id: string;
  video: string;
  title: string;
}

const STORY: Section[] = [
  { id: "hero", video: "/assets/vid/vid_1.mp4", title: "The Gateway" },
  { id: "archive", video: "/assets/vid/vid_2.mp4", title: "The Archive" },
  { id: "forge", video: "/assets/vid/vid_3.mp4", title: "The Forge" },
  { id: "terminal", video: "/assets/vid/vid_4.mp4", title: "The Command Core" },
];

const VideoPlane = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);
  const { viewport } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = window.scrollY / Math.max(height, 1);
    };
    window.addEventListener("scroll", handleScroll);
    
    const video = document.createElement("video");
    video.src = STORY[0].video;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();
    videoRef.current = video;
    
    const texture = new THREE.VideoTexture(video);
    texture.repeat.set(1.1, 1.1);
    texture.offset.set(-0.05, -0.05);
    textureRef.current = texture;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.pause();
      video.src = "";
      video.load();
    };
  }, []);

  useFrame(() => {
    if (!videoRef.current || !textureRef.current) return;

    const progress = scrollRef.current;
    const sectionIndex = Math.min(Math.max(0, Math.floor(progress * STORY.length)), STORY.length - 1);
    
    const section = STORY[sectionIndex];
    if (!section) return;

    const currentSrc = window.location.origin + section.video;
    if (videoRef.current.src !== currentSrc) {
      videoRef.current.src = section.video;
      videoRef.current.load();
    }

    const sectionProgress = (progress * STORY.length) % 1;
    const duration = videoRef.current.duration || 5;
    videoRef.current.currentTime = sectionProgress * duration;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={textureRef.current || null} transparent />
    </mesh>
  );
};

export default function ScrollWorld() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#05010D] z-[-1] overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 1]} />
        <VideoPlane />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

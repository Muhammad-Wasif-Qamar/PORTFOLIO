"use client";
import React, { useEffect, useRef } from "react";
export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    const particles: {x:number;y:number;size:number;vx:number;vy:number}[] = [];
    const particleCount = 80;
    for (let i =0;i<particleCount;i++) particles.push({
      x: Math.random()*width,
      y: Math.random()*height,
      size: Math.random()*3 + 1,
      vx: (Math.random()-0.5)*0.8,
      vy: (Math.random()-0.5)*0.8
    });
    let animationFrameId:number;
    const animate = () => {
      ctx.clearRect(0,0,width,height);
      // Draw lines
      for (let i=0;i<particles.length;i++){
        for (let j=i+1;j<particles.length;j++){
          const dx = particles[i].x-particles[j].x;
          const dy = particles[i].y-particles[j].y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist<120){
            ctx.beginPath();
            ctx.strokeStyle = `rgba(199,162,124,${0.15*(1-dist/120)})`;
            ctx.lineWidth =1;
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw particles
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        p.x +=p.vx; p.y +=p.vy;
        if (p.x<0||p.x>width) p.vx*=-1;
        if (p.y<0||p.y>height) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = Math.random()>0.7? "#C7A27C":"#4A4A4A";
        ctx.globalAlpha = Math.random()*0.5+0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {if (!canvas) return; width=canvas.width=canvas.offsetWidth; height=canvas.height=canvas.offsetHeight;};
    window.addEventListener("resize", handleResize);
    return () => {cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", handleResize);};
  }, []);
  return <div className="w-full h-full relative"><canvas ref={canvasRef} className="w-full h-full"/></div>;
}
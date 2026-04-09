"use client";

import React, { useEffect, useRef } from "react";

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const nodes: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      baseVx: number; 
      baseVy: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];
    const nodeCount = 50;
    const connectionDistance = 150;
    const mouseRadius = 180;

    for (let i = 0; i < nodeCount; i++) {
      const vx = (Math.random() - 0.5) * 0.3; // Slower, more elegant
      const vy = (Math.random() - 0.5) * 0.3;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: vx,
        vy: vy,
        baseVx: vx,
        baseVy: vy,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        
        // Update pulse
        node.pulse += node.pulseSpeed;
        const pulseScale = 1 + Math.sin(node.pulse) * 0.3;
        
        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let nodeOpacity = 0.4;
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          node.vx -= dx * force * 0.01;
          node.vy -= dy * force * 0.01;
          nodeOpacity = 0.4 + force * 0.4; // Brighten nearby nodes
        } else {
          node.vx += (node.baseVx - node.vx) * 0.02;
          node.vy += (node.baseVy - node.vy) * 0.02;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.baseVx *= -1;
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.baseVy *= -1;
        }

        // Draw connections first (behind nodes)
        for (let j = i + 1; j < nodeCount; j++) {
          const other = nodes[j];
          const cdx = node.x - other.x;
          const cdy = node.y - other.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < connectionDistance) {
            const opacity = 1 - cdist / connectionDistance;
            
            // Highlight connections near mouse
            const mdx = mouseRef.current.x - (node.x + other.x) / 2;
            const mdy = mouseRef.current.y - (node.y + other.y) / 2;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            let highlight = 0;
            if (mdist < mouseRadius) {
              highlight = (mouseRadius - mdist) / mouseRadius;
            }

            ctx.strokeStyle = `rgba(58, 58, 58, ${(opacity * 0.15) + (highlight * 0.2)})`;
            ctx.lineWidth = opacity * (1 + highlight);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = `rgba(47, 47, 47, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2 * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full cursor-none" />
    </div>
  );
}

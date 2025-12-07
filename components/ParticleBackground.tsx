"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle HiDPI / Retina for crisp lines
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
    };

    const particles: Particle[] = [];
    const particleCount = 90;

    const createParticle = (): Particle => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const speedBase = 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedBase,
        vy: (Math.random() - 0.5) * speedBase,
        size: Math.random() * 2 + 0.8,
        baseSize: Math.random() * 2 + 0.8,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const mouse = { x: 0, y: 0, active: false };
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const maxDistance = 160;

    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      // Subtle gradient background with motion blur
      ctx.fillStyle = "rgba(248, 250, 252, 0.90)";
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      particles.forEach((particle, i) => {
        // Move
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges for smoother movement
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        // Mouse attraction / repulsion
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          if (dist < 140) {
            const force = (140 - dist) / 140;
            const directionX = dx / dist;
            const directionY = dy / dist;
            particle.x += directionX * force * 1.2;
            particle.y += directionY * force * 1.2;
          }
        }

        // Pulse size over time
        const pulse = 0.5 + Math.sin(time * 1.5 + i) * 0.3;
        const size = particle.baseSize * pulse;

        // Particle color: blue → purple gradient shimmer
        const hue = 215 + Math.sin(time + i * 0.3) * 10; // around slate/blue
        const saturation = 80;
        const lightness = 55 + Math.sin(time * 0.6 + i) * 8;
        const alpha = 0.5;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            let lineAlpha = (1 - distance / maxDistance) * 0.45;

            // Highlight connections near the mouse
            if (mouse.active) {
              const midX = (particle.x + other.x) / 2;
              const midY = (particle.y + other.y) / 2;
              const mdx = midX - mouse.x;
              const mdy = midY - mouse.y;
              const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mouseDist < 200) {
                lineAlpha += (1 - mouseDist / 200) * 0.25;
              }
            }

            ctx.strokeStyle = `hsla(${hue}, 85%, 60%, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}


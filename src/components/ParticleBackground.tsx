import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const isActive = useRef(true);

  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  });

  const initParticles = (width: number, height: number) => {
    const particleCount = Math.min(50, Math.floor((width * height) / 20000));
    particles.current = Array.from({ length: particleCount }, () =>
      createParticle(
        Math.random() * width,
        Math.random() * height
      )
    );
  };

  const updateParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!isActive.current) return;
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fff';

    particles.current.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      ctx.globalAlpha = particle.opacity;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      initParticles(rect.width, rect.height);
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      updateParticles(ctx, canvas.width, canvas.height);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      isActive.current = false;
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ 
        mixBlendMode: 'screen',
        willChange: 'transform'
      }}
    />
  );
};

export default React.memo(ParticleBackground);

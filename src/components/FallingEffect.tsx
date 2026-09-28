import React, { useEffect, useRef } from 'react';

interface FallingEffectProps {
  type?: 'petals' | 'hearts' | 'sparkles' | 'none';
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  color: string;
}

export const FallingEffect: React.FC<FallingEffectProps> = ({
  type = 'petals',
  density = 22,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = ['#fbcfe8', '#f472b6', '#fda4af', '#fecdd3', '#ffe4e6'];
    const heartColors = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48'];
    const sparkleColors = ['#fef08a', '#fde047', '#fed7aa', '#ffffff'];

    const colors =
      type === 'hearts' ? heartColors : type === 'sparkles' ? sparkleColors : petalColors;

    const particles: Particle[] = [];

    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: type === 'sparkles' ? Math.random() * 3 + 2 : Math.random() * 12 + 10,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.4 + 0.4,
        swayAmplitude: Math.random() * 2 + 1,
        swayFrequency: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swayFrequency + p.swayOffset) * p.swayAmplitude + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (type === 'hearts') {
          // Draw heart
          const s = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.5, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.2, s * 0.5, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else if (type === 'sparkles') {
          // Draw 4-point star
          const s = p.size;
          ctx.beginPath();
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw rose petal
          const w = p.size;
          const h = p.size * 1.4;
          ctx.beginPath();
          ctx.ellipse(0, 0, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, density]);

  if (type === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

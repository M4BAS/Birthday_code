import React, { useEffect, useState } from 'react';
import Confetti from './Confetti';

function HeartSVG({ size = 200, color = '#FF1493', glow = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 90" style={{
      filter: glow ? `drop-shadow(0 0 20px ${color}) drop-shadow(0 0 40px ${color}88)` : 'none',
      animation: 'heartBeat 1.2s ease-in-out infinite',
    }}>
      <path d="M50 80 C50 80 10 55 10 28 C10 15 20 5 35 10 C42 12 47 18 50 22 C53 18 58 12 65 10 C80 5 90 15 90 28 C90 55 50 80 50 80Z"
        fill={color} />
    </svg>
  );
}

const MINI_HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  size: 16 + Math.random() * 28,
  color: ['#FF6B9D', '#FF1493', '#FF69B4', '#FFB6C1', '#FF4081', '#C71585'][Math.floor(Math.random() * 6)],
  delay: Math.random() * 2,
  duration: 2 + Math.random() * 2,
}));

export default function HeartScreen({ onDone }) {
  const [scale, setScale] = useState(0);
  const [showMini, setShowMini] = useState(false);

  useEffect(() => {
    setTimeout(() => setScale(1), 100);
    setTimeout(() => setShowMini(true), 600);
    setTimeout(onDone, 3200);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, #2d0020 0%, #0d0010 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}>
      <Confetti active={true} />

      {/* Mini floating hearts */}
      {showMini && MINI_HEARTS.map(h => (
        <div key={h.id} style={{
          position: 'absolute',
          left: `${h.x}%`, top: `${h.y}%`,
          animation: `heartBeat ${h.duration}s ${h.delay}s ease-in-out infinite, twinkle 3s ${h.delay}s ease-in-out infinite`,
        }}>
          <HeartSVG size={h.size} color={h.color} glow={false} />
        </div>
      ))}

      {/* Main heart */}
      <div style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 10,
      }}>
        <HeartSVG size={Math.min(window.innerWidth * 0.65, 260)} color="#FF1493" />
      </div>

      <div style={{
        marginTop: '24px',
        fontFamily: 'Dancing Script, cursive',
        fontSize: 'clamp(22px, 7vw, 42px)',
        color: '#FFB6C1',
        opacity: scale,
        transition: 'opacity 0.8s 0.4s',
        textShadow: '0 0 20px #FF69B488',
        zIndex: 10,
        textAlign: 'center',
        padding: '0 20px',
      }}>
        With all the love in the world 💕
      </div>
    </div>
  );
}

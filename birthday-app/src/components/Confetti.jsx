import React, { useEffect, useState } from 'react';

const COLORS = ['#FF6B9D', '#FFD700', '#9B59B6', '#FF4081', '#00CED1', '#98FF98', '#FFB347', '#FF69B4'];

export default function Confetti({ active = true }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      skew: Math.random() * 30 - 15,
    }));
    setPieces(items);
  }, [active]);

  if (!active) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 100 }}>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${p.x}%`,
            width: p.shape === 'rect' ? `${p.size}px` : `${p.size * 0.7}px`,
            height: p.shape === 'rect' ? `${p.size * 0.4}px` : `${p.size * 0.7}px`,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            background: p.color,
            transform: `rotate(${p.rotation}deg) skew(${p.skew}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

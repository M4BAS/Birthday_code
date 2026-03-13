import React, { useEffect, useState } from 'react';

const COLORS = ['#FF6B9D', '#FFD700', '#9B59B6', '#FF4081', '#87CEEB', '#98FF98', '#FFB347'];
const SHAPES = ['●', '★', '♦', '▲', '♥'];

export default function Particles({ count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 14,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
    }));
    setParticles(items);
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
            opacity: 0.8,
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  );
}

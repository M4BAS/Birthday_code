import React, { useEffect, useState } from 'react';

// Generate heart shape coordinates
function getHeartPoints(n) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * 2 * Math.PI;
    // Parametric heart curve
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    points.push({ x, y });
  }
  return points;
}

const PHOTO_SRCS = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
];

const COLORS = ['#FF6B9D', '#FFD700', '#87CEEB', '#9B59B6'];

const heartPoints = getHeartPoints(28);

// Also fill interior with a grid pattern
function getInteriorPoints() {
  const pts = [];
  for (let i = -14; i <= 14; i += 3.5) {
    for (let j = -14; j <= 14; j += 3.5) {
      // Test if point is inside heart
      const t_approx = Math.atan2(j, i);
      const hx = 16 * Math.pow(Math.sin(t_approx), 3);
      const hy = -(13 * Math.cos(t_approx) - 5 * Math.cos(2*t_approx) - 2 * Math.cos(3*t_approx) - Math.cos(4*t_approx));
      const dist = Math.sqrt((i - hx)**2 + (j + hy)**2);
      if (dist < 5) pts.push({ x: i, y: j });
    }
  }
  return pts;
}

function PhotoTile({ src, x, y, size, delay, fallbackColor, idx }) {
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      position: 'absolute',
      left: `calc(50% + ${x}px - ${size/2}px)`,
      top: `calc(50% + ${y}px - ${size/2}px)`,
      width: `${size}px`, height: `${size}px`,
      borderRadius: '4px',
      overflow: 'hidden',
      border: `1.5px solid ${fallbackColor}88`,
      boxShadow: `0 0 8px ${fallbackColor}44`,
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0)',
      transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      animation: visible ? `heartBeat ${2 + (idx % 3) * 0.4}s ${(idx % 4) * 0.3}s ease-in-out infinite` : 'none',
    }}>
      {!imgError ? (
        <img
          src={src}
          alt=""
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: `linear-gradient(135deg, ${fallbackColor}66, ${fallbackColor}33)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size > 25 ? '14px' : '8px',
        }}>
          💕
        </div>
      )}
    </div>
  );
}

export default function HeartMosaicScreen() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Scale factor based on screen size
  const scale = Math.min(window.innerWidth, window.innerHeight) / 42;
  const tileSize = Math.max(18, Math.min(26, scale * 1.2));

  const allPoints = heartPoints.map((p, i) => ({
    x: p.x * scale,
    y: p.y * scale,
    idx: i,
    src: PHOTO_SRCS[i % 4],
    color: COLORS[i % 4],
    delay: i * 60,
  }));

  // Add some interior points
  const center = { x: 0, y: scale * 0.5 };
  const interiorSamples = [
    { x: -scale*4, y: scale*-1 }, { x: -scale*1, y: scale*-3 },
    { x: scale*3, y: scale*-1 }, { x: scale*1, y: scale*-3 },
    { x: -scale*2, y: scale*1 }, { x: scale*2, y: scale*1 },
    { x: 0, y: scale*-1 }, { x: 0, y: scale*2 },
    { x: -scale*5, y: scale*1 }, { x: scale*5, y: scale*1 },
    { x: -scale*3, y: scale*-2.5 }, { x: scale*3, y: scale*-2.5 },
  ].map((p, i) => ({
    ...p,
    idx: heartPoints.length + i,
    src: PHOTO_SRCS[(heartPoints.length + i) % 4],
    color: COLORS[(heartPoints.length + i) % 4],
    delay: (heartPoints.length + i) * 50 + 800,
  }));

  const allTiles = [...allPoints, ...interiorSamples];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at center, #200030 0%, #0a000f 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: '4%', zIndex: 20,
        textAlign: 'center', padding: '0 20px',
        animation: 'fadeSlideUp 0.8s ease forwards',
      }}>
        <div style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: 'clamp(20px, 6vw, 36px)',
          background: 'linear-gradient(135deg, #FF6B9D, #FFD700, #FF6B9D)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
        }}>
          Made with Love 💗
        </div>
        <div style={{
          fontFamily: 'Dancing Script, cursive',
          color: '#FFB6C1', fontSize: 'clamp(14px, 4vw, 20px)',
          marginTop: '4px', opacity: 0.85,
          textShadow: '0 0 15px #FF69B466',
        }}>
          Every photo, a beautiful memory
        </div>
      </div>

      {/* Photo heart mosaic */}
      <div style={{
        position: 'relative',
        width: '100%', height: '70%',
        marginTop: '40px',
      }}>
        {allTiles.map((tile, i) => (
          <PhotoTile
            key={i}
            src={tile.src}
            x={tile.x}
            y={tile.y}
            size={tileSize}
            delay={tile.delay}
            fallbackColor={tile.color}
            idx={i}
          />
        ))}
      </div>

      {/* Bottom message */}
      <div style={{
        position: 'absolute', bottom: '4%',
        textAlign: 'center', padding: '0 24px',
        zIndex: 20,
        animation: 'fadeSlideUp 0.8s 2s ease both',
      }}>
        <div style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: 'clamp(18px, 5.5vw, 30px)',
          color: '#FF69B4',
          textShadow: '0 0 20px #FF69B488',
          animation: 'glowPulse 2s ease-in-out infinite',
        }}>
          Happy Birthday, Chinenye! 🎂✨
        </div>
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          color: '#ffffff66', fontSize: '13px',
          marginTop: '6px',
        }}>
          May this day be as special as you are 💕
        </div>
      </div>

      {/* Floating sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${5 + i * 8}%`,
          top: `${15 + (i % 3) * 25}%`,
          fontSize: '16px',
          animation: `twinkle ${2 + (i % 3) * 0.5}s ${i * 0.3}s ease-in-out infinite`,
          pointerEvents: 'none',
        }}>
          {['✨','💫','⭐','🌟'][i % 4]}
        </div>
      ))}
    </div>
  );
}

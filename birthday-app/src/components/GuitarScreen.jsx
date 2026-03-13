import React, { useEffect, useState } from 'react';
import Particles from './Particles';
import Confetti from './Confetti';

function GuitarSticker() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % 4), 180);
    return () => clearInterval(interval);
  }, []);

  // Animated guitar player SVG - strumming animation
  const strumOffset = [0, -3, 2, -1][frame];
  const bodyRotate = [0, 2, -1, 1][frame];
  const noteOpacity = [0, 1, 0.5, 0.8][frame];
  const noteY = [0, -5, -10, -15][frame];

  return (
    <svg width="180" height="220" viewBox="0 0 180 220" style={{ overflow: 'visible' }}>
      {/* Musical notes floating */}
      <text x="130" y={50 + noteY} style={{ fontSize: '20px', opacity: noteOpacity, transition: 'all 0.2s', fill: '#FFD700' }}>♪</text>
      <text x="145" y={30 + noteY * 0.7} style={{ fontSize: '14px', opacity: noteOpacity * 0.7, transition: 'all 0.2s', fill: '#FF69B4' }}>♫</text>
      <text x="115" y={65 + noteY * 1.3} style={{ fontSize: '16px', opacity: noteOpacity * 0.9, transition: 'all 0.2s', fill: '#87CEEB' }}>♩</text>

      <g transform={`translate(90, 110) rotate(${bodyRotate}) translate(-90, -110)`}>
        {/* Body */}
        <ellipse cx="90" cy="145" rx="30" ry="36" fill="#FF6B9D" />
        {/* Head */}
        <circle cx="90" cy="78" r="22" fill="#FFDAB9" />
        {/* Hair */}
        <ellipse cx="90" cy="65" rx="23" ry="14" fill="#4A2C0A" />
        <ellipse cx="72" cy="72" rx="8" ry="18" fill="#4A2C0A" />
        <ellipse cx="108" cy="72" rx="8" ry="18" fill="#4A2C0A" />
        {/* Face */}
        <circle cx="83" cy="79" r="3" fill="#333" />
        <circle cx="97" cy="79" r="3" fill="#333" />
        <path d="M84 88 Q90 94 96 88" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="80" cy="85" r="5" fill="#FF9999" opacity="0.5" />
        <circle cx="100" cy="85" r="5" fill="#FF9999" opacity="0.5" />
        {/* Dress / shirt */}
        <path d="M65 125 Q90 115 115 125 L120 165 Q90 175 60 165Z" fill="#C71585" />
        {/* Legs */}
        <rect x="78" y="178" width="12" height="28" rx="6" fill="#FFDAB9" />
        <rect x="94" y="178" width="12" height="28" rx="6" fill="#FFDAB9" />
        {/* Shoes */}
        <ellipse cx="84" cy="206" rx="10" ry="6" fill="#8B4513" />
        <ellipse cx="100" cy="206" rx="10" ry="6" fill="#8B4513" />

        {/* Guitar body */}
        <g transform={`translate(${strumOffset}, 0)`}>
          <ellipse cx="55" cy="148" rx="20" ry="24" fill="#8B4513" />
          <ellipse cx="55" cy="148" rx="14" ry="18" fill="#A0522D" />
          <circle cx="55" cy="148" r="6" fill="#1a0a00" opacity="0.6" />
          {/* Guitar neck */}
          <rect x="37" y="110" width="7" height="45" rx="3" fill="#6B3410" />
          {/* Frets */}
          {[0,1,2,3].map(i => (
            <rect key={i} x="37" y={118 + i * 9} width="7" height="1.5" fill="#FFD700" opacity="0.7" />
          ))}
          {/* Strings */}
          {[-2,0,2].map((offset, i) => (
            <line key={i}
              x1={40 + offset * 0.8} y1="112"
              x2={55 + offset} y2="168"
              stroke="#E8E8E8" strokeWidth="0.8" opacity="0.7"
            />
          ))}
        </g>

        {/* Arms */}
        <path d="M65 130 Q50 145 52 155" stroke="#FFDAB9" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M115 130 Q118 140 115 148" stroke="#FFDAB9" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Strumming hand */}
        <circle cx="115" cy={150 + strumOffset} r="7" fill="#FFDAB9" />
      </g>
    </svg>
  );
}

export default function GuitarScreen({ onDone }) {
  const [titleIn, setTitleIn] = useState(false);
  const [subIn, setSubIn] = useState(false);
  const [showConf, setShowConf] = useState(false);

  useEffect(() => {
    setTimeout(() => setTitleIn(true), 300);
    setTimeout(() => setSubIn(true), 800);
    setTimeout(() => setShowConf(true), 500);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(160deg, #1a0030 0%, #0d1a40 50%, #200d30 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      gap: '0px',
    }}>
      <Particles count={20} />
      {showConf && <Confetti active />}

      {/* Stars background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: '3px', height: '3px',
          borderRadius: '50%',
          background: '#fff',
          animation: `twinkle ${1.5 + Math.random() * 2}s ${Math.random() * 3}s ease-in-out infinite`,
        }} />
      ))}

      <div style={{
        animation: titleIn ? 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
        opacity: titleIn ? undefined : 0,
        textAlign: 'center',
        zIndex: 10,
        marginBottom: '8px',
      }}>
        <div style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: 'clamp(28px, 9vw, 58px)',
          background: 'linear-gradient(135deg, #FF6B9D, #FFD700, #FF6B9D)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
          lineHeight: 1.2,
          padding: '0 16px',
        }}>
          Happy Birthday
        </div>
        <div style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: 'clamp(36px, 12vw, 80px)',
          color: '#FF69B4',
          textShadow: '0 0 30px #FF69B488, 0 0 60px #FF69B444',
          lineHeight: 1.1,
          animation: 'glowPulse 2s ease-in-out infinite',
        }}>
          Chinenye!
        </div>
      </div>

      <div style={{ zIndex: 10, position: 'relative' }}>
        <GuitarSticker />
        {/* Sparkles around sticker */}
        {['⭐', '✨', '🎵', '💫', '🎶'].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${[10, 70, 5, 60, 35][i]}%`,
            left: `${[-20, -15, 110, 105, 115][i]}%`,
            fontSize: '20px',
            animation: `twinkle ${1.5 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
          }}>
            {s}
          </div>
        ))}
      </div>

      {subIn && (
        <div style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: 'clamp(16px, 5vw, 28px)',
          color: '#FFB6C1',
          textAlign: 'center',
          padding: '0 24px',
          marginTop: '8px',
          animation: 'fadeSlideUp 0.6s ease forwards',
          zIndex: 10,
          textShadow: '0 0 15px #FF69B466',
        }}>
          🎂 Wishing you the most magical day! 🎂
        </div>
      )}

      <button
        onClick={onDone}
        style={{
          position: 'absolute', bottom: '7%',
          background: 'linear-gradient(135deg, #FF6B9D, #C71585)',
          color: '#fff',
          border: 'none', borderRadius: '50px',
          padding: '14px 36px',
          fontSize: '16px', fontFamily: 'Nunito, sans-serif', fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 0 20px #FF6B9D66',
          animation: 'bounce 2s ease-in-out infinite',
          zIndex: 20,
          letterSpacing: '1px',
        }}
      >
        See Your Photos 📸
      </button>
    </div>
  );
}

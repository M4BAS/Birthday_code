import React, { useEffect, useState } from 'react';
import Particles from './Particles';

const SLIDES = [
  { word: 'HAPPY', color: '#FF6B9D', bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d0a4e 100%)', glow: '#FF6B9D' },
  { word: 'BIRTHDAY', color: '#FFD700', bg: 'linear-gradient(135deg, #1a0a10 0%, #2e1a00 100%)', glow: '#FFD700' },
  { word: 'TO', color: '#87CEEB', bg: 'linear-gradient(135deg, #001a2e 0%, #002e4a 100%)', glow: '#87CEEB' },
  { word: 'CHINENYE', color: '#FF69B4', bg: 'linear-gradient(135deg, #1a0020 0%, #2e003a 100%)', glow: '#FF69B4' },
];

const LETTER_ANIM_DELAY = 0.07;

export default function WordSlideshow({ onDone }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'hold' | 'out'

  useEffect(() => {
    const word = SLIDES[slideIdx].word;
    // in phase: word.length * delay + 0.4s
    const inDuration = word.length * LETTER_ANIM_DELAY * 1000 + 500;

    const holdTimer = setTimeout(() => setPhase('out'), inDuration + 400);
    const nextTimer = setTimeout(() => {
      if (slideIdx < SLIDES.length - 1) {
        setSlideIdx(i => i + 1);
        setPhase('in');
      } else {
        onDone();
      }
    }, inDuration + 900);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(nextTimer);
    };
  }, [slideIdx]);

  const slide = SLIDES[slideIdx];
  const letters = slide.word.split('');

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: slide.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      transition: 'background 0.5s',
    }}>
      <Particles count={12} />

      {/* Decorative arcs */}
      <div style={{
        position: 'absolute', top: '-50px', right: '-50px',
        width: '300px', height: '300px', borderRadius: '50%',
        border: `3px solid ${slide.color}22`,
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '350px', height: '350px', borderRadius: '50%',
        border: `2px solid ${slide.color}18`,
      }} />

      {/* Word */}
      <div style={{
        display: 'flex', gap: 'clamp(2px, 1.5vw, 12px)',
        flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px',
        zIndex: 10,
      }}>
        {letters.map((letter, i) => (
          <span key={`${slideIdx}-${i}`} style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: slide.word.length > 6 ? 'clamp(36px, 12vw, 90px)' : 'clamp(56px, 18vw, 140px)',
            color: slide.color,
            textShadow: `0 0 30px ${slide.glow}88, 0 0 60px ${slide.glow}44`,
            display: 'inline-block',
            animation: phase === 'in'
              ? `scaleIn 0.5s ${i * LETTER_ANIM_DELAY}s cubic-bezier(0.34, 1.56, 0.64, 1) both`
              : phase === 'out'
              ? `fadeSlideUp 0.4s ${(letters.length - 1 - i) * 0.04}s ease-in both reverse`
              : 'none',
            opacity: phase === 'hold' ? 1 : undefined,
          }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Slide indicator */}
      <div style={{
        position: 'absolute', bottom: '8%',
        display: 'flex', gap: '10px',
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            width: i === slideIdx ? '28px' : '10px',
            height: '10px',
            borderRadius: '5px',
            background: i === slideIdx ? s.color : '#ffffff22',
            boxShadow: i === slideIdx ? `0 0 10px ${s.color}` : 'none',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  );
}

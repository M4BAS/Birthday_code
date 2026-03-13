import React, { useEffect, useState } from 'react';
import Particles from './Particles';

export default function CountdownScreen({ onDone }) {
  const [count, setCount] = useState(3);
  const [visible, setVisible] = useState(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setTimeout(onDone, 600);
      return;
    }
    setVisible(true);
    setFlash(false);
    const hideTimer = setTimeout(() => {
      setFlash(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setCount(c => c - 1), 200);
      }, 200);
    }, 900);
    return () => clearTimeout(hideTimer);
  }, [count]);

  const colors = ['#FF6B9D', '#FFD700', '#9B59B6'];
  const ringColors = ['#FF1493', '#FFA500', '#8A2BE2'];
  const c = count > 0 ? count : '';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at center, ${count > 0 ? ringColors[count - 1] + '33' : '#000'} 0%, #0d0020 70%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      transition: 'background 0.4s',
    }}>
      <Particles count={15} />

      {/* Rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: `${i * 200}px`, height: `${i * 200}px`,
          borderRadius: '50%',
          border: `2px solid ${count > 0 ? colors[count-1] : '#fff'}22`,
          animation: `spin ${3 + i}s linear infinite`,
          opacity: 0.4,
        }} />
      ))}

      {count > 0 && visible && (
        <div style={{
          fontSize: 'clamp(120px, 40vw, 220px)',
          fontFamily: 'Pacifico, cursive',
          color: colors[count - 1],
          textShadow: `0 0 40px ${colors[count-1]}, 0 0 80px ${colors[count-1]}88`,
          animation: flash ? 'none' : 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          transform: flash ? 'scale(1.5)' : undefined,
          opacity: flash ? 0 : 1,
          transition: flash ? 'transform 0.2s, opacity 0.2s' : 'none',
          lineHeight: 1,
          zIndex: 10,
        }}>
          {count}
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: '10%',
        display: 'flex', gap: '16px',
      }}>
        {[3,2,1].map(n => (
          <div key={n} style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: n >= count ? colors[n-1] : '#ffffff22',
            boxShadow: n >= count ? `0 0 10px ${colors[n-1]}` : 'none',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  );
}

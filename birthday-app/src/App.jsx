import React, { useState, useEffect } from 'react';
import CountdownScreen from './components/CountdownScreen';
import WordSlideshow from './components/WordSlideshow';
import HeartScreen from './components/HeartScreen';
import GuitarScreen from './components/GuitarScreen';
import PhotoCardScreen from './components/PhotoCardScreen';
import HeartMosaicScreen from './components/HeartMosaicScreen';

const SCREENS = [
  'countdown',
  'words',
  'heart',
  'guitar',
  'photos',
  'mosaic',
];

function TiltSplash({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dismiss = () => {
    setFadeOut(true);
    setTimeout(onDone, 500);
  };

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const t = setTimeout(dismiss, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'absolute', inset: 0, zIndex: 999,
        background: 'linear-gradient(160deg, #0d0020 0%, #1a0035 60%, #0d0020 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '24px',
        cursor: 'pointer',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Animated phone icon */}
      <div style={{
        fontSize: '72px',
        animation: 'tiltPhone 1.8s ease-in-out infinite',
        display: 'inline-block',
        filter: 'drop-shadow(0 0 20px #FF6B9D88)',
      }}>
        📱
      </div>

      <div style={{ textAlign: 'center', padding: '0 32px' }}>
        <div style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: 'clamp(20px, 6vw, 32px)',
          color: '#FF6B9D',
          textShadow: '0 0 20px #FF6B9D88',
          marginBottom: '10px',
          animation: 'fadeSlideUp 0.6s ease forwards',
        }}>
          For the best experience
        </div>
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 'clamp(15px, 4.5vw, 22px)',
          color: '#FFD700',
          fontWeight: 700,
          textShadow: '0 0 15px #FFD70066',
          animation: 'fadeSlideUp 0.6s 0.15s ease both',
        }}>
          Hold your phone upright 🙃
        </div>
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 'clamp(13px, 3.5vw, 17px)',
          color: '#ffffff55',
          marginTop: '10px',
          animation: 'fadeSlideUp 0.6s 0.3s ease both',
        }}>
          (portrait mode is best 💕)
        </div>
      </div>

      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        color: '#ffffff33',
        marginTop: '8px',
        animation: 'fadeSlideUp 0.6s 0.6s ease both',
      }}>
        Tap anywhere to continue
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #FF6B9D, #FFD700)',
        animation: 'progressBar 4s linear forwards',
        boxShadow: '0 0 8px #FF6B9D',
      }} />

      <style>{`
        @keyframes tiltPhone {
          0%, 100% { transform: rotate(-15deg) scale(1); }
          50% { transform: rotate(15deg) scale(1.05); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screenIdx, setScreenIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const currentScreen = SCREENS[screenIdx];

  const advance = () => {
    if (screenIdx >= SCREENS.length - 1) return;
    setTransitioning(true);
    setTimeout(() => {
      setScreenIdx(i => i + 1);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0d0020',
    }}>
      {showSplash && <TiltSplash onDone={() => setShowSplash(false)} />}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        {currentScreen === 'countdown' && (
          <CountdownScreen onDone={advance} />
        )}
        {currentScreen === 'words' && (
          <WordSlideshow onDone={advance} />
        )}
        {currentScreen === 'heart' && (
          <HeartScreen onDone={advance} />
        )}
        {currentScreen === 'guitar' && (
          <GuitarScreen onDone={advance} />
        )}
        {currentScreen === 'photos' && (
          <PhotoCardScreen onDone={advance} />
        )}
        {currentScreen === 'mosaic' && (
          <HeartMosaicScreen />
        )}
      </div>
    </div>
  );
}

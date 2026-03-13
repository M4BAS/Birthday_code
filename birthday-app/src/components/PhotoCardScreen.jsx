import React, { useState, useRef } from 'react';

// Placeholder photo URLs - user replaces these with actual photos
const PHOTOS = [
  { src: '/photos/photo1.jpg', caption: '✨ So beautiful ✨' },
  { src: '/photos/photo2.jpg', caption: '💖 Always shining 💖' },
  { src: '/photos/photo3.jpg', caption: '🌟 Simply amazing 🌟' },
  { src: '/photos/photo4.jpg', caption: '🎉 Our star! 🎉' },
];

const PLACEHOLDER_COLORS = ['#FF6B9D', '#FFD700', '#87CEEB', '#9B59B6'];

function PhotoCard({ photo, index, isActive, position }) {
  const [imgError, setImgError] = useState(false);
  const x = position === 'center' ? 0 : position === 'right' ? 100 : -100;
  const opacity = position === 'center' ? 1 : 0.4;
  const scale = position === 'center' ? 1 : 0.85;

  return (
    <div style={{
      position: 'absolute',
      width: 'min(320px, 85vw)',
      height: 'min(420px, 72vh)',
      borderRadius: '24px',
      overflow: 'hidden',
      transform: `translateX(${x}%) scale(${scale})`,
      opacity,
      transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: position === 'center' ? '0 30px 60px #00000088, 0 0 40px #FF6B9D44' : '0 10px 30px #00000066',
      zIndex: position === 'center' ? 10 : 5,
    }}>
      {/* Photo */}
      {!imgError ? (
        <img
          src={photo.src}
          alt={`Photo ${index + 1}`}
          onError={() => setImgError(true)}
          style={{
            width: '100%', height: '80%',
            objectFit: 'cover', display: 'block',
          }}
        />
      ) : (
        // Placeholder when no real photo
        <div style={{
          width: '100%', height: '80%',
          background: `linear-gradient(135deg, ${PLACEHOLDER_COLORS[index]}44, ${PLACEHOLDER_COLORS[index]}22)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          gap: '12px',
          borderBottom: `2px solid ${PLACEHOLDER_COLORS[index]}44`,
        }}>
          <div style={{ fontSize: '64px', opacity: 0.6 }}>📸</div>
          <div style={{
            fontFamily: 'Nunito, sans-serif',
            color: PLACEHOLDER_COLORS[index],
            fontSize: '14px', opacity: 0.7,
            textAlign: 'center', padding: '0 20px',
          }}>
            Replace /photos/photo{index + 1}.jpg<br/>with Chinenye's photo
          </div>
        </div>
      )}

      {/* Caption bar */}
      <div style={{
        height: '20%',
        background: 'linear-gradient(to top, #0d0020, #1a0030)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '4px',
        padding: '8px',
      }}>
        <div style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: 'clamp(18px, 5vw, 26px)',
          color: '#FFD700',
          textShadow: '0 0 15px #FFD70066',
          textAlign: 'center',
        }}>
          {photo.caption}
        </div>
        <div style={{
          display: 'flex', gap: '6px',
        }}>
          {PHOTOS.map((_, i) => (
            <div key={i} style={{
              width: i === index ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === index ? '#FF6B9D' : '#ffffff33',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PhotoCardScreen({ onDone }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const dragX = useRef(0);

  const goNext = () => {
    if (currentIdx < PHOTOS.length - 1) setCurrentIdx(i => i + 1);
  };
  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? goNext() : goPrev();
    }
  };
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };
  const handleMouseUp = (e) => {
    setIsDragging(false);
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? goNext() : goPrev();
    }
  };

  const getPosition = (i) => {
    if (i === currentIdx) return 'center';
    if (i === currentIdx + 1) return 'right';
    if (i === currentIdx - 1) return 'left';
    return 'hidden';
  };

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0d001a 0%, #1a0030 50%, #000d1a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <div style={{
        position: 'absolute', top: '5%',
        textAlign: 'center', zIndex: 20, padding: '0 20px',
      }}>
        <div style={{
          fontFamily: 'Pacifico, cursive',
          fontSize: 'clamp(18px, 5.5vw, 32px)',
          background: 'linear-gradient(135deg, #FF6B9D, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Chinenye's Gallery 💕
        </div>
        <div style={{ color: '#ffffff55', fontSize: '13px', fontFamily: 'Nunito', marginTop: '4px' }}>
          Swipe to browse
        </div>
      </div>

      {/* Cards */}
      <div style={{
        position: 'relative',
        width: 'min(320px, 85vw)',
        height: 'min(420px, 72vh)',
      }}>
        {PHOTOS.map((photo, i) => {
          const pos = getPosition(i);
          if (pos === 'hidden') return null;
          return (
            <PhotoCard
              key={i}
              photo={photo}
              index={i}
              isActive={i === currentIdx}
              position={pos}
            />
          );
        })}
      </div>

      {/* Arrow buttons */}
      <div style={{
        position: 'absolute', bottom: '16%',
        display: 'flex', gap: '20px', zIndex: 20,
      }}>
        <button onClick={goPrev} disabled={currentIdx === 0} style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: currentIdx === 0 ? '#ffffff11' : 'linear-gradient(135deg, #FF6B9D, #C71585)',
          border: 'none', color: '#fff', fontSize: '20px',
          cursor: currentIdx === 0 ? 'default' : 'pointer',
          opacity: currentIdx === 0 ? 0.3 : 1,
          transition: 'all 0.2s',
          boxShadow: currentIdx === 0 ? 'none' : '0 0 15px #FF6B9D66',
        }}>‹</button>
        <button onClick={goNext} disabled={currentIdx === PHOTOS.length - 1} style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: currentIdx === PHOTOS.length - 1 ? '#ffffff11' : 'linear-gradient(135deg, #FF6B9D, #C71585)',
          border: 'none', color: '#fff', fontSize: '20px',
          cursor: currentIdx === PHOTOS.length - 1 ? 'default' : 'pointer',
          opacity: currentIdx === PHOTOS.length - 1 ? 0.3 : 1,
          transition: 'all 0.2s',
          boxShadow: currentIdx === PHOTOS.length - 1 ? 'none' : '0 0 15px #FF6B9D66',
        }}>›</button>
      </div>

      <button
        onClick={onDone}
        style={{
          position: 'absolute', bottom: '5%',
          background: 'linear-gradient(135deg, #9B59B6, #C71585)',
          color: '#fff', border: 'none', borderRadius: '50px',
          padding: '12px 32px',
          fontSize: '15px', fontFamily: 'Nunito, sans-serif', fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 0 20px #9B59B666',
          zIndex: 20,
          letterSpacing: '0.5px',
        }}
      >
        See Heart of Love 💗
      </button>
    </div>
  );
}

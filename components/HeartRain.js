'use client';

import { useEffect, useState } from 'react';

export default function HeartRain() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate hearts
    const heartArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 30,
      opacity: 0.6 + Math.random() * 0.4,
      emoji: ['❤️', '💕', '💖', '💗', '💝', '💓', '💞'][Math.floor(Math.random() * 7)]
    }));
    setHearts(heartArray);

    // Clean up after animation
    const timer = setTimeout(() => {
      setHearts([]);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            top: '-50px'
          }}
        >
          {heart.emoji}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 5s linear forwards;
        }
      `}</style>
    </div>
  );
}
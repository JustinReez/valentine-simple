'use client';

import { useState, useEffect } from 'react';

export default function PersonalizedMessage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const messages = [
    {
      title: "Every Moment with You",
      text: "From the first time we talked, I knew there was something special about you. Your laugh, your smile, the way you see the world - everything about you makes my heart skip a beat.",
      icon: "✨"
    },
    {
      title: "You're My Sunshine",
      text: "Even on my darkest days, thinking of you brings light into my life. You have this incredible ability to make everything better just by being yourself.",
      icon: "🌟"
    },
    {
      title: "My Heart Chose You",
      text: "I didn't plan to fall for you, but my heart knew what it wanted. And what it wants is to spend every possible moment making you smile.",
      icon: "💝"
    }
  ];

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-rose-100 mb-10 sm:mb-12 lg:mb-16 font-serif px-4">
        What You Mean to Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-rose-300/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="text-5xl sm:text-6xl mb-4 text-center animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
              {message.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-rose-100 mb-3 sm:mb-4 text-center font-serif">
              {message.title}
            </h3>
            <p className="text-rose-200 text-base sm:text-lg leading-relaxed text-center">
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <div className="inline-block bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-rose-300/30 max-w-3xl mx-auto">
          <p className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl text-rose-100 font-script leading-relaxed px-4">
            "In a world full of temporary things,
            <br className="hidden xs:inline" />
            <span className="inline xs:inline"> you are my forever feeling."</span>
          </p>
          <div className="mt-4 sm:mt-6 text-4xl sm:text-5xl animate-heartbeat">
            💕
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(0.9); }
          20%, 40%, 60%, 80% { transform: scale(1.2); }
          50%, 70% { transform: scale(1.1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s infinite;
        }
      `}</style>
    </div>
  );
}
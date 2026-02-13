'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnimationCanvas from '../../components/AnimationCanvas';
import HeartRain from '../../components/HeartRain';
import Modal from '../../components/Modal';

export default function ConfessPage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showHeartRain, setShowHeartRain] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const messages = [
    "Please? 🥺",
    "Are you sure? 💔",
    "Think about it... 💭",
    "Don't break my heart... 💘",
    "Just give me a chance... 🌹",
    "I promise to make you happy... ✨",
    "You're making this hard... 😢",
    "My heart is waiting... 💗",
    "Come on, you know you want to... 😊",
    "The 'Yes' button is getting bigger for a reason! 💕"
  ];

  useEffect(() => {
    if (attempts > 0 && attempts < messages.length) {
      setMessage(messages[attempts - 1]);
    }
  }, [attempts]);

  const handleNoClick = () => {
    // Move button to random position with mobile-safe boundaries
    const isMobile = window.innerWidth < 640; // sm breakpoint
    const buttonWidth = isMobile ? 160 : 200;
    const buttonHeight = 60;
    
    const maxX = window.innerWidth - buttonWidth - 20; // 20px margin
    const maxY = window.innerHeight - buttonHeight - 20;
    
    const randomX = Math.random() * Math.max(maxX, 100);
    const randomY = Math.random() * Math.max(maxY, 100);
    
    setNoButtonPosition({ x: randomX, y: randomY });
    
    // Shrink No button
    setNoButtonSize(prev => Math.max(prev - 0.1, 0.3));
    
    // Grow Yes button
    setYesButtonSize(prev => prev + 0.3);
    
    // Increment attempts
    setAttempts(prev => prev + 1);
  };

  const handleNoHover = () => {
    if (attempts > 3) {
      // Make it even harder to click after several attempts
      const isMobile = window.innerWidth < 640;
      const buttonWidth = isMobile ? 160 : 200;
      const buttonHeight = 60;
      
      const maxX = window.innerWidth - buttonWidth - 20;
      const maxY = window.innerHeight - buttonHeight - 20;
      
      const randomX = Math.random() * Math.max(maxX, 100);
      const randomY = Math.random() * Math.max(maxY, 100);
      
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    // Save to localStorage
    localStorage.setItem('valentineAnswer', 'yes');
    localStorage.setItem('valentineDate', new Date().toISOString());
    
    // Show celebration
    setShowHeartRain(true);
    setShowModal(true);
  };

  const handleShareToWhatsApp = () => {
    const message = encodeURIComponent(
      "I said YES! 💕\n\n" + window.location.origin
    );
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Could redirect to a final page or stay here
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 overflow-hidden relative flex items-center justify-center p-4">
      <AnimationCanvas />
      {showHeartRain && <HeartRain />}
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rose-100 mb-6 sm:mb-8 font-serif animate-float leading-tight">
          Will You Be My Girlfriend?
        </h1>
        
        <p className="text-xl xs:text-2xl sm:text-2xl md:text-3xl text-rose-200 mb-3 sm:mb-4 font-light px-2">
          I've been thinking about this for a while...
        </p>
        
        <p className="text-lg xs:text-xl sm:text-xl md:text-2xl text-rose-300 mb-8 sm:mb-12 font-light italic px-2">
          You make every day brighter just by being in it 💕
        </p>

        {message && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-rose-300/30 animate-fade-in mx-auto max-w-md">
            <p className="text-xl sm:text-2xl text-rose-100 font-script">
              {message}
            </p>
          </div>
        )}

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesButtonSize})` }}
            className="px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xl sm:text-2xl font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 button-glow active:scale-95 min-w-[200px] sm:min-w-[250px]"
          >
            Yes! 💚
          </button>

          {/* No Button - moves around */}
          <button
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            style={{
              transform: `scale(${noButtonSize})`,
              position: attempts > 0 ? 'fixed' : 'relative',
              left: attempts > 0 ? `${noButtonPosition.x}px` : 'auto',
              top: attempts > 0 ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.3s ease-out'
            }}
            className="px-10 sm:px-12 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:shadow-gray-500/50 transition-all duration-300 active:scale-95 min-w-[160px] sm:min-w-[200px]"
          >
            No 😔
          </button>
        </div>

        {attempts > 5 && (
          <p className="mt-6 sm:mt-8 text-rose-200 text-base sm:text-lg animate-pulse px-4">
            Notice how the 'Yes' button is getting bigger? 
            <br className="hidden sm:inline" />
            <span className="inline sm:inline"> It's a sign! 😉</span>
          </p>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <Modal onClose={handleModalClose}>
          <div className="text-center">
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 animate-heartbeat">💕</div>
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-3 sm:mb-4 font-serif px-2">
              You Made My Day!
            </h2>
            <p className="text-xl xs:text-2xl sm:text-2xl text-gray-700 mb-4 sm:mb-6 px-4">
              I'm the happiest person in the world right now! 🌟
            </p>
            <p className="text-lg xs:text-xl sm:text-xl text-gray-600 px-4 mb-6">
              This is just the beginning of our beautiful story together...
            </p>
            
            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareToWhatsApp}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base sm:text-lg font-bold rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto mb-4"
            >
              <span className="text-xl sm:text-2xl">📱</span>
              <span>Share the Good News on WhatsApp!</span>
            </button>
            
            <p className="text-sm text-gray-500 italic">
              Tell the creator that you said yes! 😊
            </p>
          </div>
        </Modal>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(0.9); }
          20%, 40%, 60%, 80% { transform: scale(1.1); }
          50%, 70% { transform: scale(1.05); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
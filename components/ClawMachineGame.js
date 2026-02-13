'use client';

import { useState, useEffect, useRef } from 'react';

export default function ClawMachineGame() {
  const [clawPosition, setClawPosition] = useState(50);
  const [isDropping, setIsDropping] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [collectedHearts, setCollectedHearts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [clawAngle, setClawAngle] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);
  const [grabbedHeart, setGrabbedHeart] = useState(null);
  const gameRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Difficulty settings
  const difficultySettings = {
    easy: { tolerance: 10, speed: 5, hearts: 6 },
    medium: { tolerance: 7, speed: 7, hearts: 8 },
    hard: { tolerance: 5, speed: 10, hearts: 10 }
  };

  useEffect(() => {
    // Initialize hearts based on difficulty
    const settings = difficultySettings[difficulty];
    const initialHearts = Array.from({ length: settings.hearts }, (_, i) => ({
      id: i,
      x: Math.random() * 75 + 12.5,
      y: 75 + Math.random() * 10, // Positioned near bottom
      collected: false,
      size: Math.random() * 8 + 18,
      rotation: Math.random() * 360,
      color: ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]
    }));
    setHearts(initialHearts);
  }, [difficulty]);

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyPress = (e) => {
      if (isDropping || isGrabbing || isReturning) return;

      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setClawPosition(prev => Math.max(prev - difficultySettings[difficulty].speed, 10));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setClawPosition(prev => Math.min(prev + difficultySettings[difficulty].speed, 90));
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          dropClaw();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, isDropping, isGrabbing, isReturning, clawPosition, difficulty]);

  const startGame = () => {
    setGameStarted(true);
    setMessage('🎯 Position the claw and drop to grab hearts!');
    setAttempts(0);
    setCombo(0);
    setScore(0);
  };

  const holdMoveClaw = (direction, start = true) => {
    if (start && !isDropping && !isGrabbing && !isReturning) {
      moveIntervalRef.current = setInterval(() => {
        moveClaw(direction);
      }, 50);
    } else {
      clearInterval(moveIntervalRef.current);
    }
  };

  const dropClaw = () => {
    if (isDropping || isGrabbing || isReturning) return;

    setIsDropping(true);
    setIsReturning(false);
    setAttempts(prev => prev + 1);
    setMessage('⬇️ Dropping...');
    setClawAngle(5);

    // Animate drop
    setTimeout(() => {
      setIsDropping(false);
      setIsGrabbing(true);
      setClawAngle(-5);
      checkForHeart();
    }, 1200);
  };

  const checkForHeart = () => {
    const tolerance = difficultySettings[difficulty].tolerance;
    let heartGrabbed = null;
    let closestHeart = null;
    let minDistance = Infinity;

    // Find closest heart
    hearts.forEach(heart => {
      if (!heart.collected) {
        const distance = Math.abs(heart.x - clawPosition);
        if (distance < minDistance) {
          minDistance = distance;
          closestHeart = heart;
        }
      }
    });

    // Check if close enough to grab
    if (closestHeart && minDistance < tolerance) {
      heartGrabbed = closestHeart;
    }

    // Return claw with or without heart
    setTimeout(() => {
      setIsReturning(true);
      setClawAngle(0);

      if (heartGrabbed) {
        // Success!
        setGrabbedHeart(heartGrabbed);
        const updatedHearts = hearts.map(h => 
          h.id === heartGrabbed.id ? { ...h, collected: true } : h
        );
        setHearts(updatedHearts);
        
        const newCombo = combo + 1;
        const points = 100 * newCombo;
        setCombo(newCombo);
        setScore(prev => prev + points);
        setCollectedHearts(prev => prev + 1);
        setShowParticles(true);
        
        const encouragements = [
          '💕 Perfect grab!',
          '✨ Amazing catch!',
          '🎯 Bulls-eye!',
          '⭐ Incredible!',
          '🌟 You\'re a pro!',
          '💝 Smooth moves!',
          '🎊 Fantastic!'
        ];
        setMessage(encouragements[Math.floor(Math.random() * encouragements.length)] + ` +${points} pts! (${newCombo}x combo!)`);
        
        setTimeout(() => setShowParticles(false), 1000);

        // Check win condition
        const allCollected = updatedHearts.every(h => h.collected);
        if (allCollected) {
          setTimeout(() => {
            setMessage(`🎉 PERFECT! All hearts collected! Score: ${score + points} | Attempts: ${attempts + 1} 🎉`);
            localStorage.setItem('clawGameCompleted', 'true');
            localStorage.setItem('heartsCollected', updatedHearts.length);
            localStorage.setItem('clawGameScore', score + points);
            localStorage.setItem('clawGameAttempts', attempts + 1);
          }, 500);
        }
      } else {
        // Miss
        setCombo(0);
        const misses = [
          '😅 So close! Try again!',
          '💭 Almost had it!',
          '🎯 Adjust your aim!',
          '🤏 Just missed it!',
          '💪 Keep trying!',
          '🎮 Practice makes perfect!'
        ];
        setMessage(misses[Math.floor(Math.random() * misses.length)]);
      }

      setTimeout(() => {
        setIsGrabbing(false);
        setIsReturning(false);
        setGrabbedHeart(null);
      }, 1200);
    }, 800);
  };

  const moveClaw = (direction) => {
    if (isDropping || isGrabbing || isReturning) return;
    
    const speed = difficultySettings[difficulty].speed;
    if (direction === 'left') {
      setClawPosition(prev => Math.max(prev - speed, 10));
    } else {
      setClawPosition(prev => Math.min(prev + speed, 90));
    }
  };

  const resetGame = () => {
    setCollectedHearts(0);
    setAttempts(0);
    setCombo(0);
    setScore(0);
    setMessage('🎯 Position the claw and drop to grab hearts!');
    const settings = difficultySettings[difficulty];
    const newHearts = Array.from({ length: settings.hearts }, (_, i) => ({
      id: i,
      x: Math.random() * 75 + 12.5,
      y: 75 + Math.random() * 10, // Positioned near bottom
      collected: false,
      size: Math.random() * 8 + 18,
      rotation: Math.random() * 360,
      color: ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]
    }));
    setHearts(newHearts);
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    setGameStarted(false);
    setCollectedHearts(0);
    setAttempts(0);
    setCombo(0);
    setScore(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 rounded-3xl shadow-2xl">
      <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4 sm:mb-6 font-serif px-2">
        🎮 Claw Machine of Love 🎮
      </h2>
      
      <p className="text-center text-rose-100 text-base sm:text-lg mb-3 sm:mb-4 px-4">
        Collect all the hearts to show your dedication!
      </p>

      {/* Game Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/20">
          <div className="text-xs sm:text-sm text-rose-200">Hearts</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{collectedHearts}/{hearts.length}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/20">
          <div className="text-xs sm:text-sm text-rose-200">Score</div>
          <div className="text-lg sm:text-2xl font-bold text-yellow-300">{score}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/20">
          <div className="text-xs sm:text-sm text-rose-200">Attempts</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{attempts}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/20">
          <div className="text-xs sm:text-sm text-rose-200">Combo</div>
          <div className="text-lg sm:text-2xl font-bold text-green-300">{combo}x</div>
        </div>
      </div>

      {/* Difficulty Selector */}
      {!gameStarted && (
        <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-center items-center">
          <span className="text-white font-semibold">Difficulty:</span>
          {['easy', 'medium', 'hard'].map(level => (
            <button
              key={level}
              onClick={() => changeDifficulty(level)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                difficulty === level
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className="text-center mb-3 sm:mb-4 p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl mx-2 border border-white/30 animate-bounce-subtle">
          <p className="text-white text-sm sm:text-lg font-semibold">{message}</p>
        </div>
      )}

      {!gameStarted ? (
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <button
            onClick={startGame}
            className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg sm:text-xl lg:text-2xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-slow"
          >
            Start Game! 🎯
          </button>
          <p className="text-rose-200 mt-4 text-sm">
            {difficulty === 'easy' && '😊 Easy: Larger grab zone, 6 hearts'}
            {difficulty === 'medium' && '😎 Medium: Normal grab zone, 8 hearts'}
            {difficulty === 'hard' && '🔥 Hard: Precise timing needed, 10 hearts'}
          </p>
        </div>
      ) : (
        <div 
          ref={gameRef}
          className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-b from-blue-900/40 to-purple-900/40 border-4 border-yellow-400 rounded-2xl overflow-hidden touch-none shadow-inner"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Particle Effects */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-float-up"
                  style={{
                    left: `${clawPosition + (Math.random() - 0.5) * 20}%`,
                    top: '50%',
                    animationDelay: `${i * 0.05}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}

          {/* Claw Guide Line */}
          {!isDropping && !isGrabbing && !isReturning && (
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-rose-300/30 pointer-events-none"
              style={{ left: `${clawPosition}%` }}
            />
          )}

          {/* Claw */}
          <div 
            className="absolute top-0 transition-all z-20"
            style={{ 
              left: `${clawPosition}%`,
              transform: `translateX(-50%) translateY(${
                isDropping ? 'calc(100% - 120px)' : 
                isGrabbing ? 'calc(100% - 120px)' : 
                isReturning ? '0%' : '0'
              }) rotate(${clawAngle}deg)`,
              transition: isDropping || isGrabbing || isReturning 
                ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)' 
                : 'left 0.1s ease-out'
            }}
          >
            {/* Rope */}
            <div 
              className="w-1 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto shadow-lg relative" 
              style={{ 
                height: isDropping || isGrabbing || isReturning 
                  ? 'calc(100vh - 400px)' 
                  : '30px', 
                minHeight: isDropping || isGrabbing || isReturning ? '200px' : '30px',
                maxHeight: isDropping || isGrabbing || isReturning ? '400px' : '30px',
                transition: 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)'
              }}
            >
              {/* Rope shine effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            
            {/* Claw */}
            <div className={`relative ${isGrabbing || isReturning ? 'scale-95' : 'scale-100'} transition-transform duration-300`}>
              {/* Main claw body */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 rounded-xl shadow-2xl border-2 border-gray-700 flex items-center justify-center relative overflow-hidden">
                {/* Metallic shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20"></div>
                
                {/* Claw arms - left */}
                <div 
                  className={`absolute left-0 top-1/2 w-2 h-6 bg-gradient-to-r from-gray-500 to-gray-400 rounded-l transform -translate-y-1/2 origin-right transition-transform duration-300 ${
                    isGrabbing || isReturning ? 'rotate-12 scale-90' : 'rotate-0'
                  }`}
                  style={{ boxShadow: '-2px 0 4px rgba(0,0,0,0.3)' }}
                ></div>
                
                {/* Claw arms - right */}
                <div 
                  className={`absolute right-0 top-1/2 w-2 h-6 bg-gradient-to-l from-gray-500 to-gray-400 rounded-r transform -translate-y-1/2 origin-left transition-transform duration-300 ${
                    isGrabbing || isReturning ? '-rotate-12 scale-90' : 'rotate-0'
                  }`}
                  style={{ boxShadow: '2px 0 4px rgba(0,0,0,0.3)' }}
                ></div>
                
                {/* Claw center icon */}
                <div className="relative z-10">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-lg">⚙️</span>
                </div>
                
                {/* Grabbed heart */}
                {grabbedHeart && (isGrabbing || isReturning) && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl animate-swing z-20">
                    {grabbedHeart.color}
                  </div>
                )}
              </div>
              
              {/* Claw shadow on floor */}
              {(isDropping || isGrabbing) && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-16 h-4 bg-black/30 rounded-full blur-sm"
                  style={{ 
                    top: 'calc(100% + 10px)',
                    transform: 'translateX(-50%) scaleY(0.5)'
                  }}
                ></div>
              )}
            </div>
          </div>

          {/* Hearts */}
          {hearts.map(heart => {
            const isAligned = !heart.collected && Math.abs(heart.x - clawPosition) < 8;
            return (
              <div
                key={heart.id}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  heart.collected ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                } ${isAligned && !isDropping && !isGrabbing && !isReturning ? 'animate-grab-pulse ring-2 ring-yellow-400 rounded-full' : ''}`}
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  fontSize: `${heart.size}px`,
                  transform: heart.collected 
                    ? `translateY(-200px) rotate(${heart.rotation}deg) scale(0)` 
                    : `rotate(${heart.rotation}deg) ${isAligned && !isDropping && !isGrabbing && !isReturning ? 'scale(1.1)' : 'scale(1)'}`,
                  filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3)) ${isAligned && !isDropping && !isGrabbing && !isReturning ? 'brightness(1.2)' : 'brightness(1)'}`,
                  animation: heart.collected ? 'none' : 'float 3s ease-in-out infinite',
                  animationDelay: `${heart.id * 0.2}s`
                }}
              >
                {heart.color}
              </div>
            );
          })}

          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-yellow-700 via-yellow-500 to-yellow-400 border-t-4 border-yellow-300 shadow-inner">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
            }} />
          </div>

          {/* Left Wall */}
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-yellow-700 to-yellow-500 border-r-2 border-yellow-300" />
          
          {/* Right Wall */}
          <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-l from-yellow-700 to-yellow-500 border-l-2 border-yellow-300" />
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
            <button
              onMouseDown={() => holdMoveClaw('left', true)}
              onMouseUp={() => holdMoveClaw('left', false)}
              onMouseLeave={() => holdMoveClaw('left', false)}
              onTouchStart={() => holdMoveClaw('left', true)}
              onTouchEnd={() => holdMoveClaw('left', false)}
              onClick={() => moveClaw('left')}
              disabled={isDropping || isGrabbing || isReturning}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base sm:text-xl font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              ← Left
            </button>
            <button
              onClick={dropClaw}
              disabled={isDropping || isGrabbing || isReturning}
              className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-base sm:text-xl font-bold rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 animate-pulse-slow"
            >
              {isDropping ? '⬇️ Dropping...' : isGrabbing ? '🤲 Grabbing...' : isReturning ? '⬆️ Returning...' : 'Drop! ⬇️'}
            </button>
            <button
              onMouseDown={() => holdMoveClaw('right', true)}
              onMouseUp={() => holdMoveClaw('right', false)}
              onMouseLeave={() => holdMoveClaw('right', false)}
              onTouchStart={() => holdMoveClaw('right', true)}
              onTouchEnd={() => holdMoveClaw('right', false)}
              onClick={() => moveClaw('right')}
              disabled={isDropping || isGrabbing || isReturning}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base sm:text-xl font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              Right →
            </button>
          </div>

          <button
            onClick={resetGame}
            className="mt-4 mx-auto block px-6 py-2 bg-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/30 transition-all"
          >
            🔄 Reset Game
          </button>
        </>
      )}

      <p className="text-center text-rose-200 mt-3 sm:mt-4 text-xs sm:text-sm px-4">
        💡 Tip: Hold arrow keys or buttons to move faster! Press SPACE to drop!
      </p>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-up {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
        @keyframes swing {
          0%, 100% { transform: translateX(-50%) rotate(-5deg); }
          50% { transform: translateX(-50%) rotate(5deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes grab-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-float-up {
          animation: float-up 1s ease-out forwards;
        }
        .animate-swing {
          animation: swing 0.5s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 1s ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-grab-pulse {
          animation: grab-pulse 0.3s ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
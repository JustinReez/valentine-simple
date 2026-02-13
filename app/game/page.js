'use client';

import { useEffect, useState } from 'react';
import AnimationCanvas from '../../components/AnimationCanvas';
import ClawMachineGame from '../../components/ClawMachineGame';
import Modal from '../../components/Modal';
import storage from '../../lib/storage';

export default function GamePage() {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Check if game was just completed
    const checkCompletion = () => {
      const gameStats = storage.getStats();
      setStats(gameStats);
      
      if (gameStats.clawGameCompleted && !sessionStorage.getItem('modalShown')) {
        setShowCompletionModal(true);
        sessionStorage.setItem('modalShown', 'true');
      }
    };

    checkCompletion();

    // Listen for storage changes (in case completed in another component)
    const interval = setInterval(checkCompletion, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  const resetGame = () => {
    if (confirm('Are you sure you want to reset your game progress?')) {
      localStorage.removeItem('clawGameCompleted');
      localStorage.removeItem('heartsCollected');
      sessionStorage.removeItem('modalShown');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 overflow-hidden relative">
      <AnimationCanvas />
      
      <div className="relative z-10 pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rose-100 mb-6 font-serif animate-float">
              The Love Challenge
            </h1>
            <p className="text-xl xs:text-2xl sm:text-2xl md:text-3xl text-rose-200 font-light max-w-3xl mx-auto mb-8">
              Collect all the hearts to prove your dedication! 💕
            </p>

            {/* Game Stats */}
            {stats && stats.clawGameCompleted && (
              <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-rose-300/30 mb-6">
                <p className="text-rose-100 text-lg sm:text-xl font-semibold">
                  ✨ Game Completed! You collected {stats.heartsCollected} hearts! ✨
                </p>
              </div>
            )}
          </div>

          {/* Game Component */}
          <div className="mb-12">
            <ClawMachineGame />
          </div>

          {/* Instructions */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-300/30 mb-8">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-rose-100 mb-6 text-center font-serif">
              How to Play
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-rose-200">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">⌨️</span>
                  <div>
                    <h3 className="font-bold text-rose-100 mb-1">Keyboard Controls</h3>
                    <p className="text-sm sm:text-base">
                      Use ← and → arrow keys to move the claw
                      <br />
                      Press SPACE or ENTER to drop
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📱</span>
                  <div>
                    <h3 className="font-bold text-rose-100 mb-1">Touch Controls</h3>
                    <p className="text-sm sm:text-base">
                      Tap the Left/Right buttons to move
                      <br />
                      Tap Drop! to grab hearts
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-rose-100 mb-1">Goal</h3>
                    <p className="text-sm sm:text-base">
                      Collect all 8 hearts to complete the game
                      <br />
                      Position carefully before dropping!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h3 className="font-bold text-rose-100 mb-1">Tips</h3>
                    <p className="text-sm sm:text-base">
                      The claw has a small pickup radius
                      <br />
                      Take your time - there's no rush!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {stats && stats.clawGameCompleted && (
            <div className="text-center">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white/10 backdrop-blur-md text-rose-200 font-semibold rounded-full border border-rose-300/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Reset Game 🔄
              </button>
            </div>
          )}

          {/* Why This Game Section */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-rose-300/30">
              <div className="text-5xl sm:text-6xl mb-4">🎮</div>
              <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-rose-100 mb-4 font-serif">
                Why a Claw Machine?
              </h2>
              <p className="text-rose-200 text-lg sm:text-xl leading-relaxed">
                Just like this game requires patience, precision, and dedication to collect 
                all the hearts... I want you to know that I'm willing to put in the effort, 
                take my time, and do whatever it takes to win your heart. 
                <br /><br />
                Every heart you collect here represents a piece of my affection for you. 💕
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <Modal onClose={handleCloseModal}>
          <div className="text-center">
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🎉</div>
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-3 sm:mb-4 font-serif px-2">
              You Did It!
            </h2>
            <p className="text-xl xs:text-2xl sm:text-2xl text-gray-700 mb-4 sm:mb-6 px-4">
              You collected all {stats?.heartsCollected} hearts! 
            </p>
            <p className="text-lg xs:text-xl sm:text-xl text-gray-600 px-4 mb-6">
              Your dedication and patience paid off - just like I hope my feelings for you will! 💕
            </p>
            <div className="bg-rose-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 italic">
                "This game is easy compared to how hard I've fallen for you." 😊
              </p>
            </div>
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
      `}</style>
    </div>
  );
}
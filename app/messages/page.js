'use client';

import AnimationCanvas from '../../components/AnimationCanvas';
import PersonalizedMessage from '../../components/PersonalizedMessage';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 overflow-hidden relative">
      <AnimationCanvas />
      
      <div className="relative z-10 pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rose-100 mb-6 font-serif animate-float">
              Messages from My Heart
            </h1>
            <p className="text-xl xs:text-2xl sm:text-2xl md:text-3xl text-rose-200 font-light max-w-3xl mx-auto">
              Every word here is true, every feeling is real 💕
            </p>
          </div>

          <PersonalizedMessage />

          {/* Additional Message Section */}
          <div className="mt-16 sm:mt-20 text-center">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-rose-300/30">
              <div className="text-6xl sm:text-7xl mb-6 animate-heartbeat">💝</div>
              <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-rose-100 mb-6 font-serif">
                Why I Love You
              </h2>
              <div className="space-y-6 text-rose-200 text-lg sm:text-xl leading-relaxed text-left">
                <p>
                  Your laugh is my favorite sound. The way your eyes light up when you talk about 
                  things you're passionate about makes my heart skip a beat every single time.
                </p>
                <p>
                  You make the ordinary extraordinary. A simple walk becomes an adventure, 
                  a quiet moment becomes a memory, and every day with you feels like a gift.
                </p>
                <p>
                  You see the best in people, including me. You've shown me what it means to be 
                  truly cared for, and I want to spend every day showing you the same.
                </p>
                <p className="font-semibold text-rose-100 text-xl sm:text-2xl mt-8">
                  You're not just someone I like – you're someone I choose, every single day.
                </p>
              </div>
            </div>
          </div>

          {/* Memory Timeline (Optional - can customize) */}
          <div className="mt-16 sm:mt-20 pb-20">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-center text-rose-100 mb-12 font-serif">
              Moments I Treasure
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  emoji: '✨',
                  title: 'The First Time',
                  text: 'I knew there was something special about you from the very first conversation we had.'
                },
                {
                  emoji: '🌟',
                  title: 'Growing Closer',
                  text: 'Every moment we spend together makes me realize how lucky I am to know you.'
                },
                {
                  emoji: '💫',
                  title: 'Right Now',
                  text: 'Creating this for you, hoping you feel even a fraction of what I feel for you.'
                },
                {
                  emoji: '🌟',
                  title: 'The Future',
                  text: 'I can\'t wait to see where this journey takes us. With you, every tomorrow is brighter.'
                }
              ].map((moment, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-rose-300/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl sm:text-5xl flex-shrink-0">{moment.emoji}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-rose-100 mb-2 font-serif">
                        {moment.title}
                      </h3>
                      <p className="text-rose-200 text-base sm:text-lg leading-relaxed">
                        {moment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimationCanvas from '../components/AnimationCanvas';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Love Messages',
      description: 'Read heartfelt messages written just for you',
      icon: '💌',
      path: '/messages',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Claw Machine Game',
      description: 'Collect hearts to prove your dedication',
      icon: '🎮',
      path: '/game',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'The Big Question',
      description: 'Answer the question I\'ve been wanting to ask',
      icon: '💕',
      path: '/confess',
      color: 'from-rose-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 overflow-hidden relative">
      {/* Animated Canvas Background */}
      <AnimationCanvas />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center transition-all duration-1000 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 text-rose-100 drop-shadow-2xl animate-float font-serif tracking-tight px-4">
              For You
            </h1>
            <p className="text-xl xs:text-2xl sm:text-2xl md:text-3xl text-rose-200 mb-8 sm:mb-12 font-light tracking-wide px-4">
              A special journey awaits...
            </p>
            
            {showContent && (
              <div className="space-y-4">
                <p className="text-lg xs:text-xl sm:text-xl md:text-2xl text-rose-300 mb-8 px-4 max-w-2xl mx-auto">
                  I've created something special for you. Explore each section to discover 
                  how much you mean to me 💕
                </p>
                
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-rose-100 mb-12 sm:mb-16 font-serif px-4">
              Your Journey Begins Here
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.path}
                  className="group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-300/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                    <div className={`text-6xl sm:text-7xl mb-6 text-center group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-rose-100 mb-4 text-center font-serif">
                      {feature.title}
                    </h3>
                    <p className="text-rose-200 text-base sm:text-lg leading-relaxed text-center flex-grow">
                      {feature.description}
                    </p>
                    <div className="mt-6 text-center">
                      <span className={`inline-block px-6 py-3 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-full group-hover:shadow-lg transition-all duration-300`}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 sm:mt-20">
              <div className="inline-block bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-rose-300/30 max-w-3xl">
                <p className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl text-rose-100 font-script leading-relaxed mb-6 px-4">
                  "I spent time creating this because you're worth every second."
                </p>
                <button
                  onClick={() => router.push('/messages')}
                  className="px-8 py-4 sm:px-10 sm:py-4 bg-white text-rose-600 text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:bg-rose-50 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Start Your Journey 🌹
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .8; }
        }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from 'react';

function StrikeSequence({ strikeData }) {
  const [countdown, setCountdown] = useState(5);
  const [phase, setPhase] = useState('countdown');

  const getCountryFlag = (code) => {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setPhase('strike');
      setTimeout(() => setPhase('flash'), 2000);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-glass">
      {phase === 'countdown' && (
        <div className="text-center animate-fade-in max-w-2xl px-8">
          <div className="font-display text-[12rem] font-black text-gradient animate-glow mb-12">
            {countdown}
          </div>
          <div className="font-body text-2xl text-gray-700 font-semibold tracking-wide animate-pulse mb-8">
            Initiating Strike Sequence
          </div>
          <div className="font-body text-lg text-gray-600 mb-4">
            One (1) person will be struck by lightning
          </div>
          
          <div className="mt-16 w-96 h-3 glass-panel rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-brand-red transition-all duration-1000 rounded-full"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div>

          <div className="mt-12 flex justify-center gap-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-20 rounded-full bg-gradient-to-t from-accent-blue to-accent-purple"
                style={{
                  opacity: Math.random() * 0.5 + 0.5,
                  animation: `glow ${Math.random() * 0.5 + 0.3}s infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'strike' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Sleek expanding circles animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-brand-red"
                  style={{
                    width: '100px',
                    height: '100px',
                    animation: `expand ${2}s ease-out ${i * 0.3}s infinite`,
                    opacity: 0
                  }}
                />
              ))}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-brand-red animate-pulse shadow-[0_0_60px_rgba(230,57,70,0.5)]" />
            </div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-red-50/20" />
          
          {strikeData && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel-strong p-10 rounded-[2rem] shadow-glass-lg animate-fade-in max-w-lg w-full mx-4 mt-32">
              <div className="text-center space-y-5">
                <div className="text-brand-red font-display text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <span className="text-4xl animate-pulse">⚡</span>
                  STRIKE CONFIRMED
                </div>
                <div className="flex items-center justify-center gap-4 text-2xl">
                  <span className="text-5xl">{getCountryFlag(strikeData.country.code)}</span>
                  <span className="text-accent-blue font-bold text-2xl">{strikeData.country.name}</span>
                </div>
                <div className="text-gray-900 text-xl font-semibold">
                  {strikeData.gender}, Age {strikeData.age}
                </div>
                <div className="text-sm text-gray-600 border-t border-black/10 pt-5">
                  {strikeData.description} Witnesses: 0.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'flash' && (
        <div className="absolute inset-0 bg-white animate-pulse" />
      )}
    </div>
  );
}

export default StrikeSequence;

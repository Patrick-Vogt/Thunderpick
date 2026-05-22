import { useState } from 'react';
import countriesData from '../../countries.json';

function StrikeButton({ eligiblePool, onStrike, disabled, selectedCountries }) {
  const [isHovering, setIsHovering] = useState(false);

  const getButtonLabel = () => {
    if (eligiblePool === 0) return 'NO TARGETS AVAILABLE';
    if (eligiblePool === 1) {
      if (selectedCountries.length === 1) {
        const country = countriesData.countries.find(c => c.code === selectedCountries[0]);
        if (country && country.adult_total < 100000) {
          return 'YOU KNOW WHO YOU ARE';
        }
      }
      return 'FINAL TARGET';
    }
    return 'INITIATE STRIKE';
  };

  return (
    <div className="flex justify-center my-16">
      <button
        onClick={onStrike}
        disabled={disabled}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          relative px-20 py-8 font-display text-3xl font-bold uppercase tracking-wide
          transition-all duration-500 overflow-hidden rounded-[2rem]
          ${disabled 
            ? 'glass-panel text-gray-400 cursor-not-allowed opacity-50' 
            : 'bg-brand-red text-white cursor-pointer shadow-[0_20px_60px_rgba(230,57,70,0.3)] hover-lift hover:shadow-[0_30px_80px_rgba(230,57,70,0.4)]'
          }
          ${isHovering && !disabled ? 'scale-105' : 'scale-100'}
        `}
        title={disabled ? '' : 'This action cannot be undone. (It was never done.)'}
      >
        {isHovering && !disabled && (
          <>
            <div className="absolute inset-0 bg-white opacity-10" />
          </>
        )}
        <span className="relative z-10 flex items-center gap-4">
          <span className={isHovering && !disabled ? 'animate-glow' : ''}>⚡</span>
          {getButtonLabel()}
          <span className={isHovering && !disabled ? 'animate-glow' : ''}>⚡</span>
        </span>
      </button>
    </div>
  );
}

export default StrikeButton;

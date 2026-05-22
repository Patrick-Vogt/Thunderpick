import { useEffect, useState } from 'react';

function Header({ eligiblePool }) {
  const [animatePool, setAnimatePool] = useState(false);

  useEffect(() => {
    setAnimatePool(true);
    const timer = setTimeout(() => setAnimatePool(false), 400);
    return () => clearTimeout(timer);
  }, [eligiblePool]);

  return (
    <header className="border-b border-black/5 glass-panel-strong sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-gradient tracking-tight animate-fade-in">
            ⚡ Thunderpick
          </h1>
          <p className="font-body text-gray-500 text-sm md:text-base font-normal">
            Anger Management in Self-Therapy
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;

function StrikeHistory({ history }) {
  const getCountryFlag = (code) => {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  if (history.length === 0) {
    return (
      <div className="mt-16 glass-panel-strong p-12 text-center rounded-[2rem] shadow-glass-lg">
        <div className="font-body text-gray-500 text-lg font-medium tracking-wide">
          No strikes recorded this session
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 glass-panel-strong rounded-[2rem] shadow-glass-lg overflow-hidden animate-slide-up">
      <div className="border-b border-black/5 p-8 glass-panel">
        <h3 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
          Strike Log
        </h3>
        <div className="font-body text-sm text-gray-500 mt-2 tracking-wide">
          Session Active
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {history.map((strike, index) => (
          <div
            key={index}
            className="border-b border-black/5 p-6 hover:bg-gray-50 transition-all font-body text-sm hover-lift"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">⚡</div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-gray-500 font-mono text-xs">[{formatTimestamp(strike.timestamp)}]</span>
                  <span className="text-2xl">{getCountryFlag(strike.country.code)}</span>
                  <span className="text-accent-blue font-semibold">{strike.country.name}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-700">{strike.gender}, {strike.age}</span>
                </div>
                
                <div className="text-gray-600 text-xs">
                  {strike.description} Witnesses: 0.
                </div>
                
                <div className="text-gray-500 text-xs font-mono">
                  Pool after: <span className="text-accent-purple font-semibold">{strike.poolAfter.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-black/5 p-5 glass-panel">
        <div className="font-body text-xs text-gray-500 text-center">
          Showing {history.length} most recent strike{history.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}

export default StrikeHistory;

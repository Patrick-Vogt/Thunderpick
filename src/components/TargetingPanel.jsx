import { useState, useEffect } from 'react';
import countriesData from '../../countries.json';

function TargetingPanel({ state, dispatch, onRandomize, eligiblePool }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [animatePool, setAnimatePool] = useState(false);

  useEffect(() => {
    setAnimatePool(true);
    const timer = setTimeout(() => setAnimatePool(false), 400);
    return () => clearTimeout(timer);
  }, [eligiblePool]);

  const getCountryFlag = (code) => {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const filteredCountries = countriesData.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryToggle = (code) => {
    const newSelection = state.selectedCountries.includes(code)
      ? state.selectedCountries.filter(c => c !== code)
      : [...state.selectedCountries, code];
    dispatch({ type: 'SET_COUNTRIES', payload: newSelection });
  };

  const handleSelectAll = () => {
    dispatch({ type: 'SET_COUNTRIES', payload: [] });
  };

  return (
    <div className="glass-panel-strong p-10 mb-12 rounded-[2rem] shadow-glass-lg animate-slide-up">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-display text-4xl font-bold text-gray-900 tracking-tight">
            Targeting Parameters
          </h2>
          <div className="mt-2 font-body text-base text-gray-600">
            Total: <span className={`font-bold text-gradient transition-all duration-400 ${animatePool ? 'animate-count' : ''}`}>{eligiblePool.toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={onRandomize}
          className="px-6 py-3 glass-panel rounded-2xl border border-gray-200 text-gray-700 font-body text-sm font-medium hover:bg-gray-100 hover-lift transition-all duration-300 shadow-glass"
        >
          Randomize
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-sm text-gray-600 font-semibold tracking-wide mb-3">
            Region Selection
          </label>
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-panel text-gray-900 px-5 py-3 font-body text-sm mb-4 rounded-2xl focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all placeholder-gray-400"
          />
          <div className="mb-3">
            <button
              onClick={handleSelectAll}
              className="text-sm font-body font-semibold text-accent-blue hover:text-brand-red transition-colors"
            >
              {state.selectedCountries.length > 0 ? 'Clear All' : 'All Regions Eligible'}
            </button>
            {state.selectedCountries.length > 0 && (
              <span className="ml-3 text-xs font-body text-gray-500">
                ({state.selectedCountries.length} selected)
              </span>
            )}
          </div>
          <div className="glass-panel p-4 max-h-64 overflow-y-auto custom-scrollbar rounded-2xl">
            {filteredCountries.map(country => (
              <label
                key={country.code}
                className="flex items-center justify-between py-3 px-3 hover:bg-gray-100 cursor-pointer transition-all rounded-xl hover-lift"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={state.selectedCountries.includes(country.code)}
                    onChange={() => handleCountryToggle(country.code)}
                    className="w-4 h-4 accent-accent-blue rounded"
                  />
                  <span className="text-xl">{getCountryFlag(country.code)}</span>
                  <span className="font-body text-sm text-gray-900">{country.name}</span>
                </div>
                <span className="font-mono text-xs text-gray-500">
                  {country.adult_total.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-body text-sm text-gray-600 font-semibold tracking-wide mb-3">
              Biological Profile (Approx)
            </label>
            <div className="flex gap-2">
              {['all', 'male', 'female'].map(option => (
                <button
                  key={option}
                  onClick={() => dispatch({ type: 'SET_GENDER', payload: option })}
                  className={`flex-1 py-3 px-4 font-body text-sm font-semibold capitalize transition-all duration-300 rounded-xl ${
                    state.gender === option
                      ? 'bg-accent-blue text-white shadow-[0_8px_24px_rgba(0,122,255,0.3)]'
                      : 'glass-panel text-gray-700 hover:bg-gray-100 hover-lift'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-sm text-gray-600 font-semibold tracking-wide mb-3">
              Age Range: <span className="text-accent-blue font-bold">{state.ageRange[0]} - {state.ageRange[1]}</span>
            </label>
            <div className="px-2">
              <input
                type="range"
                min="18"
                max="100"
                value={state.ageRange[0]}
                onChange={(e) => dispatch({ 
                  type: 'SET_AGE_RANGE', 
                  payload: [parseInt(e.target.value), Math.max(parseInt(e.target.value), state.ageRange[1])]
                })}
                className="w-full mb-3 accent-accent-blue h-2 rounded-full"
              />
              <input
                type="range"
                min="18"
                max="100"
                value={state.ageRange[1]}
                onChange={(e) => dispatch({ 
                  type: 'SET_AGE_RANGE', 
                  payload: [Math.min(state.ageRange[0], parseInt(e.target.value)), parseInt(e.target.value)]
                })}
                className="w-full accent-accent-blue h-2 rounded-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm text-gray-600 font-semibold tracking-wide mb-3">
              Location Type
            </label>
            <div className="flex gap-2">
              {['all', 'urban', 'rural'].map(option => (
                <button
                  key={option}
                  onClick={() => dispatch({ type: 'SET_URBAN_RURAL', payload: option })}
                  className={`flex-1 py-3 px-4 font-body text-sm font-semibold capitalize transition-all duration-300 rounded-xl ${
                    state.urbanRural === option
                      ? 'bg-accent-purple text-white shadow-[0_8px_24px_rgba(94,92,230,0.3)]'
                      : 'glass-panel text-gray-700 hover:bg-gray-100 hover-lift'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:bg-gray-100 cursor-pointer transition-all hover-lift">
              <span className="font-body text-sm text-gray-900 font-medium">Currently Awake</span>
              <input
                type="checkbox"
                checked={state.currentlyAwake}
                onChange={() => dispatch({ type: 'TOGGLE_AWAKE' })}
                className="w-5 h-5 accent-accent-blue rounded"
              />
            </label>
            <label className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:bg-gray-100 cursor-pointer transition-all hover-lift">
              <span className="font-body text-sm text-gray-900 font-medium">Convicted Felon</span>
              <input
                type="checkbox"
                checked={state.convictedFelon}
                onChange={() => dispatch({ type: 'TOGGLE_FELON' })}
                className="w-5 h-5 accent-accent-blue rounded"
              />
            </label>
            <label className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:bg-gray-100 cursor-pointer transition-all hover-lift">
              <span className="font-body text-sm text-gray-900 font-medium">Drug User</span>
              <input
                type="checkbox"
                checked={state.drugUser}
                onChange={() => dispatch({ type: 'TOGGLE_DRUG_USER' })}
                className="w-5 h-5 accent-accent-blue rounded"
              />
            </label>
            <label className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:bg-gray-100 cursor-pointer transition-all hover-lift">
              <span className="font-body text-sm text-gray-900 font-medium">General Asshole</span>
              <input
                type="checkbox"
                checked={state.generalAsshole}
                onChange={() => dispatch({ type: 'TOGGLE_ASSHOLE' })}
                className="w-5 h-5 accent-accent-blue rounded"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TargetingPanel;

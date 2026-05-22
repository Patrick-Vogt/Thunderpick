import { useReducer, useState, useEffect } from 'react';
import Header from './components/Header';
import TargetingPanel from './components/TargetingPanel';
import StrikeButton from './components/StrikeButton';
import StrikeSequence from './components/StrikeSequence';
import StrikeHistory from './components/StrikeHistory';
import Footer from './components/Footer';
import countriesData from '../countries.json';

const initialState = {
  selectedCountries: [],
  gender: 'all',
  ageRange: [18, 100],
  urbanRural: 'all',
  currentlyAwake: false,
  convictedFelon: false,
  drugUser: false,
  generalAsshole: false,
  eligiblePool: countriesData.meta.total_adult_population,
  strikeHistory: [],
  totalStruck: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, selectedCountries: action.payload };
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_AGE_RANGE':
      return { ...state, ageRange: action.payload };
    case 'SET_URBAN_RURAL':
      return { ...state, urbanRural: action.payload };
    case 'TOGGLE_AWAKE':
      return { ...state, currentlyAwake: !state.currentlyAwake };
    case 'TOGGLE_FELON':
      return { ...state, convictedFelon: !state.convictedFelon };
    case 'TOGGLE_DRUG_USER':
      return { ...state, drugUser: !state.drugUser };
    case 'TOGGLE_ASSHOLE':
      return { ...state, generalAsshole: !state.generalAsshole };
    case 'UPDATE_POOL':
      return { ...state, eligiblePool: action.payload };
    case 'ADD_STRIKE':
      return {
        ...state,
        strikeHistory: [action.payload, ...state.strikeHistory].slice(0, 20),
        totalStruck: state.totalStruck + 1,
        eligiblePool: Math.max(0, state.eligiblePool - 1),
      };
    case 'RANDOMIZE_FILTERS':
      const randomCountries = countriesData.countries
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 5) + 1)
        .map(c => c.code);
      const randomGender = ['all', 'male', 'female'][Math.floor(Math.random() * 3)];
      const randomAge1 = Math.floor(Math.random() * 50) + 18;
      const randomAge2 = Math.floor(Math.random() * (100 - randomAge1)) + randomAge1;
      return {
        ...state,
        selectedCountries: randomCountries,
        gender: randomGender,
        ageRange: [randomAge1, randomAge2],
        urbanRural: ['all', 'urban', 'rural'][Math.floor(Math.random() * 3)],
        currentlyAwake: Math.random() > 0.5,
        convictedFelon: Math.random() > 0.5,
        drugUser: Math.random() > 0.5,
        generalAsshole: Math.random() > 0.5,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isStriking, setIsStriking] = useState(false);
  const [currentStrike, setCurrentStrike] = useState(null);

  useEffect(() => {
    const pool = calculateEligiblePool(state);
    dispatch({ type: 'UPDATE_POOL', payload: pool });
  }, [
    state.selectedCountries,
    state.gender,
    state.ageRange,
    state.urbanRural,
    state.currentlyAwake,
    state.convictedFelon,
    state.drugUser,
    state.generalAsshole,
    state.totalStruck,
  ]);

  const calculateEligiblePool = (filters) => {
    let pool = 0;
    const countries = filters.selectedCountries.length > 0
      ? countriesData.countries.filter(c => filters.selectedCountries.includes(c.code))
      : countriesData.countries;

    countries.forEach(country => {
      let countryPool = 0;

      if (filters.gender === 'all') {
        countryPool = country.adult_total;
      } else if (filters.gender === 'male') {
        countryPool = country.adult_male;
      } else {
        countryPool = country.adult_female;
      }

      const ageRangeFactor = (filters.ageRange[1] - filters.ageRange[0]) / 82;
      countryPool *= ageRangeFactor;

      if (filters.urbanRural === 'urban') {
        countryPool *= country.urban_pct;
      } else if (filters.urbanRural === 'rural') {
        countryPool *= (1 - country.urban_pct);
      }

      if (filters.currentlyAwake) {
        countryPool *= countriesData.filters.currently_awake.estimate;
      }

      if (filters.convictedFelon) {
        countryPool *= 0.08;
      }

      if (filters.drugUser) {
        countryPool *= 0.15;
      }

      if (filters.generalAsshole) {
        countryPool *= 0.42;
      }

      pool += countryPool;
    });

    pool = Math.max(0, Math.floor(pool) - filters.totalStruck);
    return pool;
  };

  const handleStrike = () => {
    if (state.eligiblePool === 0) return;

    const strikeData = generateStrikeData();
    setCurrentStrike(strikeData);
    setIsStriking(true);

    setTimeout(() => {
      dispatch({ type: 'ADD_STRIKE', payload: strikeData });
      setIsStriking(false);
      setCurrentStrike(null);
    }, 7200);
  };

  const generateStrikeData = () => {
    const countries = state.selectedCountries.length > 0
      ? countriesData.countries.filter(c => state.selectedCountries.includes(c.code))
      : countriesData.countries;

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const randomAge = Math.floor(Math.random() * (state.ageRange[1] - state.ageRange[0])) + state.ageRange[0];
    
    let randomGender;
    if (state.gender === 'all') {
      randomGender = Math.random() > 0.5 ? 'Male' : 'Female';
    } else {
      randomGender = state.gender.charAt(0).toUpperCase() + state.gender.slice(1);
    }

    const descriptions = [
      'Unverified meteorological event.',
      'Atmospheric discharge detected.',
      'Localized weather anomaly.',
      'Spontaneous electrical phenomenon.',
      'Unexplained ionization event.',
      'Thermal signature confirmed.',
      'Rapid energy transfer recorded.',
      'Cloud-to-ground incident.',
    ];

    return {
      timestamp: new Date().toISOString(),
      country: randomCountry,
      gender: randomGender,
      age: randomAge,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      poolAfter: state.eligiblePool - 1,
    };
  };

  const handleRandomize = () => {
    dispatch({ type: 'RANDOMIZE_FILTERS' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden gradient-mesh">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-red-50/30 animate-float" />
      
      <div className="relative z-10">
        <Header eligiblePool={state.eligiblePool} />
        
        <main className="container mx-auto px-6 py-12 max-w-7xl">
          <TargetingPanel
            state={state}
            dispatch={dispatch}
            onRandomize={handleRandomize}
            eligiblePool={state.eligiblePool}
          />
          
          <StrikeButton
            eligiblePool={state.eligiblePool}
            onStrike={handleStrike}
            disabled={isStriking || state.eligiblePool === 0}
            selectedCountries={state.selectedCountries}
          />
          
          <StrikeHistory history={state.strikeHistory} />
        </main>
        
        <Footer />
      </div>

      {isStriking && <StrikeSequence strikeData={currentStrike} />}
    </div>
  );
}

export default App;

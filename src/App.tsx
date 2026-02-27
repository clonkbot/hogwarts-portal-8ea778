import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating Candle Component
const FloatingCandle = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left, top: -50 }}
    initial={{ y: -100, opacity: 0 }}
    animate={{
      y: [0, 20, 0],
      opacity: [0.6, 1, 0.6]
    }}
    transition={{
      y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      delay
    }}
  >
    <div className="relative" style={{ transform: `scale(${size})` }}>
      {/* Candle body */}
      <div className="w-3 h-16 bg-gradient-to-b from-[#f5e6c8] to-[#d4a574] rounded-sm mx-auto" />
      {/* Flame */}
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div className="w-2 h-4 bg-gradient-to-t from-[#ff6b35] via-[#f4d03f] to-transparent rounded-full blur-[1px]" />
        <div className="absolute inset-0 w-2 h-4 bg-gradient-to-t from-[#ff6b35] via-[#f4d03f] to-white rounded-full opacity-80" />
      </motion.div>
      {/* Glow */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#f4d03f] rounded-full blur-xl opacity-30" />
    </div>
  </motion.div>
);

// Magical Particles
const MagicParticle = ({ color }: { color: string }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 5 + Math.random() * 5;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${randomX}%`,
        bottom: 0,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: -window.innerHeight,
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear"
      }}
    />
  );
};

// House data
const houses = [
  {
    name: 'Gryffindor',
    motto: 'Where dwell the brave at heart',
    colors: ['#740001', '#ae0001', '#eeba30'],
    traits: ['Courage', 'Bravery', 'Determination'],
    founder: 'Godric Gryffindor',
    element: 'Fire',
    animal: 'Lion'
  },
  {
    name: 'Slytherin',
    motto: 'Those cunning folk use any means',
    colors: ['#1a472a', '#2a623d', '#5d5d5d'],
    traits: ['Ambition', 'Cunning', 'Resourcefulness'],
    founder: 'Salazar Slytherin',
    element: 'Water',
    animal: 'Serpent'
  },
  {
    name: 'Ravenclaw',
    motto: 'Wit beyond measure is man\'s greatest treasure',
    colors: ['#0e1a40', '#222f5b', '#946b2d'],
    traits: ['Wisdom', 'Creativity', 'Intelligence'],
    founder: 'Rowena Ravenclaw',
    element: 'Air',
    animal: 'Eagle'
  },
  {
    name: 'Hufflepuff',
    motto: 'Those patient Hufflepuffs are true and unafraid of toil',
    colors: ['#372e29', '#ecb939', '#f0c75e'],
    traits: ['Loyalty', 'Patience', 'Dedication'],
    founder: 'Helga Hufflepuff',
    element: 'Earth',
    animal: 'Badger'
  }
];

// Sorting Hat quotes
const sortingQuotes = [
  "Hmm, difficult. Very difficult...",
  "Plenty of courage, I see...",
  "Not a bad mind either...",
  "There's talent, oh my goodness, yes...",
  "And a nice thirst to prove yourself...",
  "So where shall I put you?"
];

// House Crest Component
const HouseCrest = ({ house, isSelected, onClick }: {
  house: typeof houses[0];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <motion.div
    onClick={onClick}
    className="relative cursor-pointer group"
    whileHover={{ scale: 1.05, y: -10 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {/* Parchment card */}
    <div
      className={`relative p-4 md:p-6 rounded-lg transition-all duration-500 ${
        isSelected ? 'ring-2 ring-[#f4d03f] shadow-[0_0_30px_rgba(244,208,63,0.4)]' : ''
      }`}
      style={{
        background: `linear-gradient(145deg, #f5e6c8 0%, #e8d5b0 50%, #d4c4a0 100%)`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
    >
      {/* Wax seal effect */}
      <div
        className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${house.colors[1]}, ${house.colors[0]})`,
          boxShadow: `0 4px 15px ${house.colors[0]}80`
        }}
      >
        {house.name[0]}
      </div>

      {/* Crest shield */}
      <div
        className="w-20 h-24 md:w-24 md:h-28 mx-auto mb-3 md:mb-4 relative"
        style={{
          background: `linear-gradient(180deg, ${house.colors[0]} 0%, ${house.colors[1]} 100%)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.3), 0 5px 20px rgba(0,0,0,0.2)'
        }}
      >
        {/* Animal silhouette */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl opacity-30">
          {house.animal === 'Lion' && '🦁'}
          {house.animal === 'Serpent' && '🐍'}
          {house.animal === 'Eagle' && '🦅'}
          {house.animal === 'Badger' && '🦡'}
        </div>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>

      {/* House name */}
      <h3
        className="text-xl md:text-2xl font-bold text-center mb-1 md:mb-2"
        style={{
          fontFamily: '"Cinzel Decorative", serif',
          color: house.colors[0],
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {house.name}
      </h3>

      {/* Traits */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-2">
        {house.traits.map((trait) => (
          <span
            key={trait}
            className="text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded-full"
            style={{
              backgroundColor: `${house.colors[0]}20`,
              color: house.colors[0],
              fontFamily: '"Cormorant Garamond", serif'
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${house.colors[2]}40, transparent 70%)`
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </div>
  </motion.div>
);

// Sorting Hat Modal
const SortingHatModal = ({ isOpen, onClose, onSort }: {
  isOpen: boolean;
  onClose: () => void;
  onSort: (house: typeof houses[0]) => void;
}) => {
  const [stage, setStage] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      setQuoteIndex(0);
      return;
    }

    if (stage === 0) {
      const timer = setTimeout(() => setStage(1), 1500);
      return () => clearTimeout(timer);
    }

    if (stage === 1 && quoteIndex < sortingQuotes.length - 1) {
      const timer = setTimeout(() => setQuoteIndex(q => q + 1), 1500);
      return () => clearTimeout(timer);
    }

    if (stage === 1 && quoteIndex === sortingQuotes.length - 1) {
      const timer = setTimeout(() => {
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        onSort(randomHouse);
        setStage(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, stage, quoteIndex, onSort]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg p-6 md:p-8 rounded-xl"
            style={{
              background: 'linear-gradient(145deg, #2a1810 0%, #1a0f0a 100%)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            {/* Sorting Hat illustration */}
            <div className="text-6xl md:text-8xl text-center mb-4 md:mb-6">🎩</div>

            {/* Quote */}
            <motion.p
              key={quoteIndex}
              className="text-lg md:text-xl text-center text-[#f5e6c8] italic min-h-[60px]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {stage === 0 ? "The Sorting Hat is examining your mind..." : sortingQuotes[quoteIndex]}
            </motion.p>

            {/* Magical particles during sorting */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <MagicParticle key={i} color={i % 2 === 0 ? '#f4d03f' : '#ffffff'} />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-[#f5e6c8]/50 hover:text-[#f5e6c8] transition-colors text-xl md:text-2xl p-2"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Result Modal
const ResultModal = ({ house, onClose }: { house: typeof houses[0] | null; onClose: () => void }) => (
  <AnimatePresence>
    {house && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-md p-6 md:p-8 rounded-xl text-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${house.colors[0]} 0%, ${house.colors[1]} 100%)`,
            boxShadow: `0 25px 80px ${house.colors[0]}80`
          }}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">
              {house.animal === 'Lion' && '🦁'}
              {house.animal === 'Serpent' && '🐍'}
              {house.animal === 'Eagle' && '🦅'}
              {house.animal === 'Badger' && '🦡'}
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: '"Cinzel Decorative", serif' }}
            >
              {house.name}!
            </h2>

            <p
              className="text-white/80 italic mb-4 md:mb-6 text-sm md:text-base"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              "{house.motto}"
            </p>

            <div className="text-white/60 text-xs md:text-sm mb-4 md:mb-6">
              <p>Founded by {house.founder}</p>
              <p>Element: {house.element}</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 md:px-8 md:py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Accept My Fate
            </button>
          </motion.div>

          {/* Celebratory particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <MagicParticle key={i} color={house.colors[2]} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main App
export default function App() {
  const [selectedHouse, setSelectedHouse] = useState<typeof houses[0] | null>(null);
  const [showSorting, setShowSorting] = useState(false);
  const [sortedHouse, setSortedHouse] = useState<typeof houses[0] | null>(null);

  const candles = [...Array(15)].map((_, i) => ({
    delay: i * 0.3,
    left: `${5 + (i * 6.5)}%`,
    size: 0.6 + Math.random() * 0.5
  }));

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0f1729 30%, #1a1f2e 100%)'
      }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Floating candles */}
      <div className="absolute top-20 md:top-32 left-0 right-0 pointer-events-none hidden md:block">
        {candles.map((candle, i) => (
          <FloatingCandle key={i} {...candle} />
        ))}
      </div>

      {/* Mobile candles - fewer of them */}
      <div className="absolute top-16 left-0 right-0 pointer-events-none md:hidden">
        {candles.slice(0, 5).map((candle, i) => (
          <FloatingCandle key={i} delay={i * 0.5} left={`${10 + (i * 20)}%`} size={0.5} />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 px-4 md:px-8 py-8 md:py-16 flex-1">
        {/* Header */}
        <motion.header
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Hogwarts crest */}
          <motion.div
            className="text-5xl md:text-7xl mb-4 md:mb-6"
            animate={{
              filter: ['drop-shadow(0 0 20px rgba(244,208,63,0.3))', 'drop-shadow(0 0 40px rgba(244,208,63,0.6))', 'drop-shadow(0 0 20px rgba(244,208,63,0.3))']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🏰
          </motion.div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#f4d03f] mb-2 md:mb-4 tracking-wider"
            style={{
              fontFamily: '"Cinzel Decorative", serif',
              textShadow: '0 0 40px rgba(244,208,63,0.5), 0 4px 8px rgba(0,0,0,0.5)'
            }}
          >
            HOGWARTS
          </h1>

          <p
            className="text-base md:text-xl text-[#f5e6c8]/80 tracking-widest"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            School of Witchcraft and Wizardry
          </p>

          <motion.div
            className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-[#f4d03f] to-transparent mx-auto mt-4 md:mt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.header>

        {/* Sorting Hat CTA */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => setShowSorting(true)}
            className="relative px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-semibold overflow-hidden group"
            style={{
              background: 'linear-gradient(145deg, #2a1810 0%, #1a0f0a 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              fontFamily: '"Cinzel", serif',
              color: '#f4d03f'
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(244,208,63,0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              <span className="text-xl md:text-2xl">🎩</span>
              Begin the Sorting Ceremony
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#f4d03f]/0 via-[#f4d03f]/20 to-[#f4d03f]/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>

        {/* Houses Grid */}
        <section className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl text-center text-[#f5e6c8] mb-6 md:mb-10"
            style={{ fontFamily: '"Cinzel", serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            The Four Houses
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {houses.map((house, i) => (
              <motion.div
                key={house.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                <HouseCrest
                  house={house}
                  isSelected={selectedHouse?.name === house.name}
                  onClick={() => setSelectedHouse(house)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Selected House Details */}
        <AnimatePresence>
          {selectedHouse && (
            <motion.section
              className="max-w-2xl mx-auto mt-8 md:mt-12 p-6 md:p-8 rounded-xl"
              style={{
                background: `linear-gradient(145deg, ${selectedHouse.colors[0]}20, ${selectedHouse.colors[1]}10)`,
                border: `1px solid ${selectedHouse.colors[0]}40`
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold mb-3 md:mb-4"
                style={{
                  fontFamily: '"Cinzel Decorative", serif',
                  color: selectedHouse.colors[2]
                }}
              >
                {selectedHouse.name} House
              </h3>

              <p
                className="text-[#f5e6c8]/80 italic text-base md:text-lg mb-4 md:mb-6"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                "{selectedHouse.motto}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#f5e6c8]/70 text-sm md:text-base">
                <div>
                  <span className="text-[#f4d03f] font-semibold">Founder:</span> {selectedHouse.founder}
                </div>
                <div>
                  <span className="text-[#f4d03f] font-semibold">Element:</span> {selectedHouse.element}
                </div>
                <div>
                  <span className="text-[#f4d03f] font-semibold">Animal:</span> {selectedHouse.animal}
                </div>
                <div>
                  <span className="text-[#f4d03f] font-semibold">Traits:</span> {selectedHouse.traits.join(', ')}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 md:py-8 text-center">
        <p
          className="text-[#f5e6c8]/30 text-xs"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Requested by @trustnoneisakey · Built by @clonkbot
        </p>
      </footer>

      {/* Modals */}
      <SortingHatModal
        isOpen={showSorting}
        onClose={() => setShowSorting(false)}
        onSort={(house) => {
          setSortedHouse(house);
          setShowSorting(false);
        }}
      />

      <ResultModal
        house={sortedHouse}
        onClose={() => setSortedHouse(null)}
      />

      {/* Ambient glow at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 h-32 md:h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(244,208,63,0.08) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}

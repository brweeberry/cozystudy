import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Play, Pause, RotateCcw, Zap, Coffee, Brain, Clock } from 'lucide-react';

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [baseMinutes, setBaseMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break' | 'creative'>('study');

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          handleSwitchMode();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleSwitchMode = () => {
    let nextMode: 'study' | 'break' | 'creative';
    let nextMinutes: number;

    if (mode === 'study' || mode === 'creative') {
        nextMode = 'break';
        nextMinutes = 5;
    } else {
        nextMode = 'study';
        nextMinutes = 25;
    }

    setMode(nextMode);
    setMinutes(nextMinutes);
    setBaseMinutes(nextMinutes);
    setSeconds(0);
    setIsActive(false);
    
    try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.2;
        audio.play();
    } catch (e) {
        console.log('Audio notification blocked');
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(baseMinutes);
    setSeconds(0);
  };

  const setDuration = (m: number, mType: 'study' | 'break' | 'creative') => {
    setMode(mType);
    setMinutes(m);
    setBaseMinutes(m);
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (m: number, s: number) => {
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const percentage = ( (minutes * 60 + seconds) / (baseMinutes * 60) ) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4">
      {/* Session Type Selector - More Prominent */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
        {[
            { id: 'study', label: 'Deep Focus', icon: <Zap size={14} />, time: 25 },
            { id: 'creative', label: 'Flow', icon: <Brain size={14} />, time: 45 },
            { id: 'break', label: 'Rest', icon: <Coffee size={14} />, time: 5 },
        ].map((type) => (
            <button
                key={type.id}
                onClick={() => setDuration(type.time, type.id as any)}
                className={cn(
                    "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl border text-[10px] md:text-xs uppercase tracking-widest font-black transition-all cursor-pointer",
                    mode === type.id 
                    ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)] shadow-[0_10px_20px_rgba(230,213,188,0.2)] scale-105" 
                    : "border-[var(--color-border-dim)] bg-[var(--color-bg-secondary)] opacity-40 hover:opacity-80"
                )}
            >
                {type.icon}
                <span className="hidden xs:inline">{type.label}</span>
                <span className="xs:hidden">{type.time}m</span>
            </button>
        ))}
      </div>

      <div className="relative p-2 md:p-6 border-2 border-dashed border-[var(--color-accent)]/5 rounded-full mb-4 w-full aspect-square max-w-[280px] xs:max-w-[340px] md:max-w-[420px]">
        {/* Outer Ring */}
        <div className="w-full h-full border border-[var(--color-border-dim)] rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)]/30 backdrop-blur-md shadow-2xl transition-colors">
          <div className="relative w-[92%] h-[92%] rounded-full flex items-center justify-center">
             {/* Circular Progress */}
             <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-[var(--color-accent)] opacity-10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-[var(--color-accent)]"
                  style={{
                    strokeDasharray: '301.6',
                    strokeDashoffset: (301.6 - (301.6 * percentage) / 100).toString(),
                    transition: 'stroke-dashoffset 1s linear'
                  }}
                />
             </svg>
             
             <div className="text-center z-10 w-full px-4">
                <AnimatePresence mode="wait">
                    <motion.h1 
                        key={`${minutes}-${seconds}`}
                        initial={{ opacity: 0.5, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter tabular-nums text-[var(--color-accent)] text-glow leading-none"
                    >
                    {formatTime(minutes, seconds)}
                    </motion.h1>
                </AnimatePresence>
                <div className="flex flex-col items-center gap-2 mt-2 md:mt-6">
                    <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 bg-[var(--color-bg-tertiary)] rounded-full border border-[var(--color-border-dim)] shadow-inner">
                        <Clock size={10} className="opacity-40" />
                        <div className={cn("w-1 md:w-1.5 h-1 md:h-1.5 rounded-full animate-pulse", isActive ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "bg-orange-400 opacity-50")} />
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black opacity-60">
                            {isActive ? "Active" : "Paused"}
                        </span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8 mt-8 md:mt-12 w-full justify-center">
        <button 
          onClick={resetTimer}
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-[var(--color-border-dim)] rounded-2xl md:rounded-3xl hover:bg-[var(--color-bg-secondary)] transition-all opacity-40 hover:opacity-100 cursor-pointer hover:border-[var(--color-accent)]"
        >
          <RotateCcw size={18} />
        </button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className="flex-1 max-w-[200px] md:max-w-none md:w-64 py-4 md:py-5 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-[24px] md:rounded-[32px] font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-[0_20px_40px_-10px_rgba(230,213,188,0.3)] flex items-center justify-center gap-2 md:gap-3 group"
        >
          {isActive ? (
             <>
                <Pause size={18} fill="currentColor" strokeWidth={0} />
                <span>Pause</span>
             </>
          ) : (
            <>
                <Play size={18} fill="currentColor" strokeWidth={0} />
                <span>Start Session</span>
             </>
          )}
        </motion.button>

        <div className="w-14 items-center justify-center hidden sm:flex">
             <div className="w-1 h-12 bg-[var(--color-border-dim)] rounded-full" />
        </div>
      </div>

      {/* Preset Minutes Grid */}
      <div className="grid grid-cols-5 gap-2 md:gap-3 mt-8 md:mt-12 w-full max-w-sm md:max-w-md">
        {[15, 25, 45, 60, 90].map((m) => (
            <button 
                key={m}
                onClick={() => setDuration(m, 'study')}
                className={cn(
                    "py-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border",
                    baseMinutes === m && mode === 'study'
                    ? "bg-[var(--color-accent)]/5 border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "bg-[var(--color-bg-secondary)] border-[var(--color-border-dim)] opacity-30 hover:opacity-100 hover:border-white/20"
                )}
            >
                <span className="text-xs font-bold">{m}</span>
                <span className="text-[8px] uppercase tracking-tighter font-black opacity-40">Min</span>
            </button>
        ))}
      </div>
    </div>
  );
}

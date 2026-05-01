import Timer from './components/Timer';
import SoundMixer from './components/SoundMixer';
import TaskList from './components/TaskList';
import LibraryView from './components/LibraryView';
import StatsView from './components/StatsView';
import SettingsView from './components/SettingsView';
import GroupsView from './components/GroupsView';
import ProfileView from './components/ProfileView';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Clock, Zap } from 'lucide-react';

type View = 'focus' | 'library' | 'stats' | 'groups' | 'profile' | 'settings';
type Theme = 'default' | 'sunset' | 'forest' | 'midnight';

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [activeView, setActiveView] = useState<View>('focus');
  const [activeTheme, setActiveTheme] = useState<Theme>('default');
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  
  // Progression State
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(5);
  const [streak, setStreak] = useState(12);
  const [totalFocusTime, setTotalFocusTime] = useState(3420); // in minutes
  const [tasksCompleted, setTasksCompleted] = useState(48);

  const gainXp = (amount: number) => {
    setXp(prev => {
        const nextXp = prev + amount;
        if (nextXp >= level * 1000) {
            setLevel(l => l + 1);
            // Optional: Trigger level up notification
        }
        return nextXp;
    });
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?\s*v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(youtubeUrl);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'focus':
        return (
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 min-h-0 pb-10">
            {/* Left Section: Soundscape (Compact) */}
            <section className="order-2 lg:order-1 col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col gap-6 lg:overflow-hidden">
              <div className="panel p-6 flex flex-col min-h-[300px] lg:flex-1 lg:min-h-0 overflow-y-auto no-scrollbar">
                <SoundMixer />
              </div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="panel-dark p-6 h-24 lg:h-28 flex items-center gap-4 shrink-0 cursor-pointer group"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center text-[var(--color-bg-primary)] shadow-lg group-hover:rotate-6 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest font-black">Quick Action</p>
                  <p className="text-sm font-bold tracking-tight">Active Room</p>
                </div>
              </motion.div>
            </section>

            {/* Center Section: Focus Area (Dominant) */}
            <section className="order-1 lg:order-2 col-span-12 lg:col-span-6 xl:col-span-8 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-x border-[var(--color-border-dim)] px-4 lg:px-12 py-10 lg:py-0 relative overflow-hidden rounded-[32px] lg:rounded-[48px] bg-[var(--color-bg-secondary)]/10 shadow-2xl">
              {videoId ? (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-60 transition-opacity duration-1000 overflow-hidden">
                  <iframe
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340%] h-[340%] grayscale-[0.05] brightness-90 contrast-110 object-cover scale-110"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                    allow="autoplay"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-[var(--color-bg-primary)]/10 to-[var(--color-bg-primary)]/90" />
                  <div className="absolute inset-0 bg-[var(--color-bg-primary)]/10" />
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
                </div>
              ) : (
                <div className="absolute inset-0 bg-radial from-[var(--color-accent)]/5 via-transparent to-transparent opacity-40 pointer-events-none" />
              )}
              <div className="z-10 w-full flex flex-col items-center">
                <Timer onComplete={() => {
                   gainXp(250);
                   setTotalFocusTime(prev => prev + 25);
                }} />
              </div>
            </section>

            {/* Right Section: Workflow (Compact) */}
            <section className="order-3 lg:order-3 col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col gap-6 lg:overflow-hidden">
              <div className="panel p-6 flex flex-col min-h-[300px] lg:flex-1 lg:min-h-0 overflow-y-auto no-scrollbar">
                <TaskList onTaskComplete={() => {
                    gainXp(50);
                    setTasksCompleted(prev => prev + 1);
                }} />
              </div>
              <div className="panel-dark p-6 flex flex-col gap-4 shrink-0">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black opacity-30">
                  <span>Session Goal</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        className="h-full bg-[var(--color-accent)] shadow-[0_0_15px_rgba(230,213,188,0.5)]" 
                    />
                </div>
                <p className="text-[10px] opacity-40 font-bold text-center tracking-tight italic">"Stay in the flow."</p>
              </div>
            </section>
          </div>
        );
      case 'library':
        return <LibraryView />;
      case 'stats':
        return <StatsView 
          xp={xp} 
          level={level} 
          streak={streak} 
          totalTime={totalFocusTime} 
          tasks={tasksCompleted}
          onClaimReward={gainXp}
        />;
      case 'groups':
        return <GroupsView />;
      case 'profile':
        return <ProfileView level={level} xp={xp} streak={streak} />;
      case 'settings':
        return <SettingsView 
          currentTheme={activeTheme} 
          onThemeChange={(t) => setActiveTheme(t as Theme)} 
          youtubeUrl={youtubeUrl}
          onYoutubeChange={setYoutubeUrl}
        />;
    }
  };

  return (
    <div className={cn(
        "min-h-screen w-screen transition-all duration-700 font-sans overflow-x-hidden flex flex-col px-8 pt-8 pb-4",
        activeTheme === 'sunset' && 'theme-sunset',
        activeTheme === 'forest' && 'theme-forest',
        activeTheme === 'midnight' && 'theme-midnight'
    )}>
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center mb-12 shrink-0 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setActiveView('focus')}
        >
          <div className="w-10 h-10 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 outline outline-1 outline-[var(--color-accent)]/20 shadow-[0_0_15px_rgba(230,213,188,0.2)] text-[var(--color-bg-primary)]">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-[0.4em] uppercase text-glow">CozyStudy.</span>
        </motion.div>
        
        <nav className="flex gap-4 md:gap-10 text-[9px] md:text-[11px] font-bold tracking-[0.25em] uppercase px-4 md:px-8 py-2 md:py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border-dim)] rounded-full backdrop-blur-sm shadow-xl overflow-x-auto no-scrollbar max-w-[calc(100vw-40px)]">
          {(['focus', 'groups', 'library', 'stats', 'profile', 'settings'] as View[]).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={cn(
                "transition-all uppercase tracking-widest border-b-2 pb-0.5 cursor-pointer outline-none whitespace-nowrap shrink-0",
                activeView === view 
                ? "opacity-100 border-[var(--color-accent)]" 
                : "opacity-30 border-transparent hover:opacity-100"
              )}
            >
              {view}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-[10px] md:text-sm font-mono opacity-60 bg-[var(--color-bg-tertiary)] px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-[var(--color-border-dim)] shadow-inner">
          <Clock size={14} className="opacity-40" />
          <span>{time}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 z-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar px-2"
            >
            {renderContent()}
            </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-[var(--color-border-dim)] flex justify-between items-center text-[9px] uppercase tracking-[0.25em] font-bold shrink-0 z-10 relative">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-dim)] rounded-full opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
            <span className="tracking-widest">Ambient: Evening Rain</span>
          </div>
          <span className="opacity-20 hidden md:block">Session #001</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-4 opacity-30">
            <span>Est. 2026</span>
            <span className="opacity-50">/</span>
            <span>Geometric Balance 2.5</span>
          </div>
          <motion.div 
            animate={{ rotate: 45 }}
            whileHover={{ rotate: 225 }}
            className="w-2.5 h-2.5 bg-[var(--color-accent)] rotate-45 opacity-10" 
          />
        </div>
      </footer>
    </div>
  );
}



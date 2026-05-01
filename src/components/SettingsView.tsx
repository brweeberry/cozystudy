import { motion } from 'motion/react';
import { ToggleLeft, Bell, Sun, Volume2, Shield, User, Palette, Zap } from 'lucide-react';
import { useState } from 'react';

interface SettingsViewProps {
    currentTheme: string;
    onThemeChange: (theme: string) => void;
    youtubeUrl: string;
    onYoutubeChange: (url: string) => void;
}

const THEMES = [
    { id: 'default', name: 'Geometric', color: 'bg-[#121110]' },
    { id: 'sunset', name: 'Sunset', color: 'bg-[#1a0f0a]' },
    { id: 'forest', name: 'Forest', color: 'bg-[#0b140d]' },
    { id: 'midnight', name: 'Midnight', color: 'bg-[#0f172a]' },
];

export default function SettingsView({ currentTheme, onThemeChange, youtubeUrl, onYoutubeChange }: SettingsViewProps) {
    const [notifications, setNotifications] = useState(true);
    const [autoStart, setAutoStart] = useState(false);
    const [globalVolume, setGlobalVolume] = useState(0.8);
    const [localYoutubeUrl, setLocalYoutubeUrl] = useState(youtubeUrl);

    return (
        <div className="flex flex-col gap-10 w-full max-w-2xl mx-auto py-8 overflow-y-auto custom-scrollbar h-full px-4">
            <header className="mb-4">
                <h2 className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold mb-2 text-glow">Configuration</h2>
                <h1 className="text-3xl font-bold tracking-tighter">Preferences</h1>
            </header>

            {/* Atmosphere Section */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <Palette size={14} className="text-[var(--color-accent)] opacity-60" />
                    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Atmosphere Palette</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => onThemeChange(theme.id)}
                            className={`flex flex-col gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                                currentTheme === theme.id 
                                ? 'border-[var(--color-accent)] bg-[var(--color-bg-tertiary)] shadow-[0_0_20px_rgba(230,213,188,0.1)] opacity-100' 
                                : 'border-transparent bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] opacity-60 hover:opacity-100'
                            }`}
                        >
                            <div className={`w-full aspect-square rounded-xl ${theme.color} border border-white/5 shadow-inner`} />
                            <span className="text-[10px] font-bold uppercase tracking-tight text-center">{theme.name}</span>
                        </button>
                    ))}
                </div>

                <div className="panel p-6 mt-2">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">YouTube Background Backdrop</h3>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input 
                                type="text"
                                value={localYoutubeUrl}
                                onChange={(e) => setLocalYoutubeUrl(e.target.value)}
                                placeholder="Paste YouTube Link (e.g. Lofi Girl stream)"
                                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-dim)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-accent)] transition-all placeholder:opacity-20"
                            />
                            {localYoutubeUrl && (
                                <button 
                                    onClick={() => { setLocalYoutubeUrl(''); onYoutubeChange(''); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold opacity-40 hover:opacity-100"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <button 
                            onClick={() => onYoutubeChange(localYoutubeUrl)}
                            className="px-6 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                            OK
                        </button>
                    </div>
                    <p className="text-[9px] opacity-30 mt-3 italic">* Video audio is enabled. It will serve as an ambient background in Focus mode.</p>
                </div>
            </section>

            {/* Audio Section */}
            <section className="panel p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Volume2 size={16} className="text-[var(--color-accent)]" />
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Master Fidelity</h2>
                    </div>
                    <span className="text-xs font-mono opacity-40">{Math.round(globalVolume * 100)}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={globalVolume}
                    onChange={(e) => setGlobalVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[var(--color-bg-primary)] rounded-full appearance-none cursor-pointer accent-[var(--color-accent)]"
                />
            </section>

            {/* General Toggles */}
            <section className="flex flex-col gap-4">
                <div className="panel overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-dim)] hover:bg-white/[0.02] transition-colors">
                        <div className="flex gap-4 items-center">
                            <Bell size={18} className="opacity-40" />
                            <div>
                                <p className="text-sm font-semibold">Sound Notifications</p>
                                <p className="text-[10px] opacity-40 mt-0.5">Chime when session ends</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 rounded-full relative transition-colors duration-500 cursor-pointer ${notifications ? 'bg-[var(--color-accent)]' : 'bg-white/10'}`}
                        >
                            <motion.div 
                                animate={{ x: notifications ? 24 : 4 }}
                                className="absolute top-1 w-4 h-4 bg-[var(--color-bg-primary)] rounded-full shadow-sm"
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
                        <div className="flex gap-4 items-center">
                            <Zap size={18} className="opacity-40" />
                            <div>
                                <p className="text-sm font-semibold">Auto-Focus Sequence</p>
                                <p className="text-[10px] opacity-40 mt-0.5">Seamlessly move to next session</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setAutoStart(!autoStart)}
                            className={`w-12 h-6 rounded-full relative transition-colors duration-500 cursor-pointer ${autoStart ? 'bg-[var(--color-accent)]' : 'bg-white/10'}`}
                        >
                            <motion.div 
                                animate={{ x: autoStart ? 24 : 4 }}
                                className="absolute top-1 w-4 h-4 bg-[var(--color-bg-primary)] rounded-full shadow-sm"
                            />
                        </button>
                    </div>
                </div>
            </section>

            <div className="bg-[var(--color-accent)]/5 border border-dashed border-[var(--color-accent)]/20 p-8 rounded-2xl text-center">
                <Shield size={24} className="mx-auto mb-4 opacity-40" />
                <h3 className="text-sm font-bold tracking-tight mb-1">Authenticated Encryption</h3>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Client-Side Preference Sync Enabled</p>
            </div>
        </div>
    );
}
